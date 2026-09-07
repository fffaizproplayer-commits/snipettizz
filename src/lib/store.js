const fs = require('fs');
const path = require('path');

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const REDIS_KEY = 'izzapi:snippets';
const USE_REDIS = Boolean(REDIS_URL && REDIS_TOKEN);

// ---------- Local JSON file fallback (dev only - does NOT persist on Vercel) ----------
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'snippets.json');

function fileReadAll() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
    } catch {
        return [];
    }
}

function fileWriteAll(list) {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

// ---------- Upstash Redis REST helpers ----------
async function redisCommand(...args) {
    const res = await fetch(`${REDIS_URL}/${args.map(encodeURIComponent).join('/')}`, {
        headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
    });
    if (!res.ok) throw new Error(`Redis error: HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(`Redis error: ${data.error}`);
    return data.result;
}

async function redisReadAll() {
    const raw = await redisCommand('get', REDIS_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

async function redisWriteAll(list) {
    await redisCommand('set', REDIS_KEY, JSON.stringify(list));
}

// ---------- Storage-agnostic layer ----------
async function readAll() {
    return USE_REDIS ? redisReadAll() : fileReadAll();
}

async function writeAll(list) {
    return USE_REDIS ? redisWriteAll(list) : fileWriteAll(list);
}

function slugify(title) {
    return title.toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || 'snippet';
}

async function list() {
    const all = await readAll();
    return all
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(({ code, ...meta }) => ({ ...meta, preview: code.split('\n').slice(0, 8).join('\n'), lines: code.split('\n').length }));
}

async function get(id) {
    const all = await readAll();
    return all.find(s => s.id === id) || null;
}

async function create({ title, description = '', category = 'Scraper', file = '', code }) {
    if (!title || !title.trim()) throw new Error('title wajib diisi');
    if (!code || !code.trim()) throw new Error('code wajib diisi');
    if (!['Scraper', 'Feature'].includes(category)) throw new Error('category harus "Scraper" atau "Feature"');

    const all = await readAll();
    let baseId = slugify(title);
    let id = baseId;
    let n = 2;
    while (all.some(s => s.id === id)) { id = `${baseId}-${n}`; n++; }

    const entry = {
        id,
        title: title.trim(),
        description: description.trim(),
        category,
        file: file.trim() || `${id}.js`,
        date: new Date().toISOString(),
        code
    };

    all.push(entry);
    await writeAll(all);
    return entry;
}

async function update(id, fields) {
    const all = await readAll();
    const idx = all.findIndex(s => s.id === id);
    if (idx === -1) return null;

    const current = all[idx];
    const next = {
        ...current,
        title: fields.title !== undefined ? fields.title.trim() : current.title,
        description: fields.description !== undefined ? fields.description.trim() : current.description,
        category: fields.category !== undefined ? fields.category : current.category,
        file: fields.file !== undefined ? fields.file.trim() : current.file,
        code: fields.code !== undefined ? fields.code : current.code
    };

    if (!['Scraper', 'Feature'].includes(next.category)) throw new Error('category harus "Scraper" atau "Feature"');

    all[idx] = next;
    await writeAll(all);
    return next;
}

async function remove(id) {
    const all = await readAll();
    const next = all.filter(s => s.id !== id);
    const removed = next.length !== all.length;
    if (removed) await writeAll(next);
    return removed;
}

module.exports = { list, get, create, update, remove, USE_REDIS };
