function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/gestao-municipal-angular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-heroku/'}),
);

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port || server_host);
