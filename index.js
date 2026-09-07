const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== JSON RESPONSE WRAPPER ==========
app.use((req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        if (data && typeof data === 'object' && data.status === undefined) {
            data = { status: true, ...data };
        }
        return originalJson(data);
    };
    next();
});

// ========== STATIC ASSETS ==========
app.use('/', express.static(path.join(__dirname, 'api-page'), { index: false }));

// ========== API ROUTES (auto-load src/api/**/*.js) ==========
const apiRoot = path.join(__dirname, 'src', 'api');
if (fs.existsSync(apiRoot)) {
    for (const folder of fs.readdirSync(apiRoot)) {
        const folderPath = path.join(apiRoot, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;
        for (const file of fs.readdirSync(folderPath)) {
            if (!file.endsWith('.js')) continue;
            try {
                const route = require(path.join(folderPath, file));
                if (typeof route === 'function') route(app);
            } catch (e) {
                console.error(`Failed to load route ${folder}/${file}:`, e.message);
            }
        }
    }
}

// ========== PAGES ==========
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'api-page', 'index.html')));
app.get('/snippet/:id', (req, res) => res.sendFile(path.join(__dirname, 'api-page', 'view.html')));

// ========== 404 ==========
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ status: false, message: 'Endpoint tidak ditemukan' });
    }
    res.status(404).sendFile(path.join(__dirname, 'api-page', '404.html'), (err) => {
        if (err) res.status(404).send('404 Not Found');
    });
});

const PORT = process.env.PORT || 3000;
if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => console.log(`snip-izzcs running on port ${PORT}`));
}

module.exports = app;
