const enabled = process.env.INDEXNOW_ENABLED === 'true';

if (!enabled) {
  console.log('IndexNow is disabled. Set INDEXNOW_ENABLED=true only after launch and key verification.');
  process.exit(0);
}

const host = process.env.INDEXNOW_HOST;
const key = process.env.INDEXNOW_KEY;
const urls = process.argv.slice(2);

if (!host || !key) {
  throw new Error('INDEXNOW_HOST and INDEXNOW_KEY are required when IndexNow is enabled.');
}
if (!urls.length) {
  throw new Error('Pass one or more absolute URLs to submit to IndexNow.');
}
if (urls.some((url) => new URL(url).host !== host)) {
  throw new Error('Every submitted URL must match INDEXNOW_HOST.');
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});

if (!response.ok) throw new Error(`IndexNow submission failed with HTTP ${response.status}.`);
console.log(`Submitted ${urls.length} URL(s) to IndexNow.`);
