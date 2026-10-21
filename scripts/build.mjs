import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
// Only generated deployment output is replaced.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'styles.css', 'app.js', 'assets']) {
  await cp(new URL(name, root), new URL(name, output), { recursive: true });
}
await writeFile(new URL('.nojekyll', output), '');
const html = await readFile(new URL('index.html', output), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|data:)/.test(match[1])) await readFile(new URL(match[1], output));
}
console.log(`Deployment files ready: ${fileURLToPath(output)}`);
