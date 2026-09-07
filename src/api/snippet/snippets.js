const store = require('../../lib/store.js');

module.exports = (app) => {
    app.get('/snippets', async (req, res) => {
        try {
            res.json({ status: true, result: await store.list() });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    });

    app.get('/snippets/:id', async (req, res) => {
        try {
            const snip = await store.get(req.params.id);
            if (!snip) return res.status(404).json({ status: false, message: 'Snippet tidak ditemukan' });
            res.json({ status: true, result: snip });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    });

    app.get('/snipet/raw/:id', async (req, res) => {
        try {
            const snip = await store.get(req.params.id);
            if (!snip) return res.status(404).type('text/plain').send('Snippet tidak ditemukan');
            res.type('text/plain').send(snip.code);
        } catch (e) {
            res.status(500).type('text/plain').send('Gagal mengambil snippet');
        }
    });

    app.post('/snippets', async (req, res) => {
        try {
            const { title, description, category, file, code } = req.body || {};
            const entry = await store.create({ title, description, category, file, code });
            res.status(201).json({ status: true, result: entry });
        } catch (e) {
            res.status(400).json({ status: false, message: e.message });
        }
    });

    app.put('/snippets/:id', async (req, res) => {
        try {
            const updated = await store.update(req.params.id, req.body || {});
            if (!updated) return res.status(404).json({ status: false, message: 'Snippet tidak ditemukan' });
            res.json({ status: true, result: updated });
        } catch (e) {
            res.status(400).json({ status: false, message: e.message });
        }
    });

    app.delete('/snippets/:id', async (req, res) => {
        try {
            const removed = await store.remove(req.params.id);
            if (!removed) return res.status(404).json({ status: false, message: 'Snippet tidak ditemukan' });
            res.json({ status: true, result: { id: req.params.id, deleted: true } });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    });

    app.get('/snippets-meta/storage', (req, res) => {
        res.json({ status: true, result: { backend: store.USE_REDIS ? 'upstash-redis' : 'local-file (not persistent on Vercel!)' } });
    });
};
