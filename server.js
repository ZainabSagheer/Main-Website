const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '.next', 'standalone');
const staticSrc = path.join(__dirname, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(__dirname, 'public');
const publicDest = path.join(standaloneDir, 'public');

if (fs.existsSync(staticSrc) && !fs.existsSync(staticDest)) {
  fs.cpSync(staticSrc, staticDest, { recursive: true });
}
if (fs.existsSync(publicSrc) && !fs.existsSync(publicDest)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}

require('./.next/standalone/server.js');
