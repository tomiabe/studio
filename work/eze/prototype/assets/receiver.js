const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'figma-source');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const match = req.url.match(/\/([^\/]+)\.png$/);
      if (match) {
        const file = path.join(dir, match[1] + '.png');
        fs.writeFileSync(file, Buffer.from(body, 'base64'));
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('saved');
        return;
      }
    });
  }
  res.writeHead(404);
  res.end();
});

server.listen(4174, '127.0.0.1', () => {
  console.log('Receiver listening on 127.0.0.1:4174');
});
