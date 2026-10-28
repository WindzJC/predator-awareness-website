import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
const suppliedUrl = process.env.SITE_URL || process.env.CF_PAGES_URL;
if (!suppliedUrl) {
  throw new Error('Set SITE_URL for a local build. Cloudflare Pages supplies CF_PAGES_URL automatically.');
}
const siteUrl = new URL(suppliedUrl);
if (siteUrl.protocol !== 'https:' || siteUrl.username || siteUrl.password) {
  throw new Error('The deployment URL must use HTTPS without credentials.');
}
const imageUrl = new URL('assets/social-preview.jpg', `${siteUrl.origin}/`).href;
let html = await readFile(path.join(root, 'index.html'), 'utf8');
const imageMeta = '<meta property="og:image" content="assets/social-preview.jpg">';
if (!html.includes(imageMeta)) throw new Error('Expected Open Graph image metadata was not found.');
html = html.replace(imageMeta, `<meta property="og:image" content="${imageUrl}">`);
await mkdir(output, { recursive: true });
// Copy only public website assets. Repository notes and build sources stay outside dist/.
for (const filename of ['styles.css', 'script.js', '_headers', 'favicon.ico', 'favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png', 'assets']) {
  await cp(path.join(root, filename), path.join(output, filename), { recursive: true });
}
await writeFile(path.join(output, 'index.html'), html);
console.log('Static homepage built in dist/. No-index policies retained.');
