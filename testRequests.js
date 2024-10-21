const fetch = require('node-fetch');
const ora = require('ora-classic');

const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  'edgio-exp': 'true',
  pragma: 'no-cache',
  priority: 'u=0, i',
  'sec-ch-ua':
    '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
};

const statusOra = ora({
  text: 'Waiting for response...',
}).start();
const statusText = [
  '[/serverless-proxy-exception] Successful request count: 0',
  '[/origin-proxy-exception] Successful request count: 0',
  '[/redirect-to-error] Successful request count: 0',
];

async function makeRequest(url, idx) {
  let successCount = 0;
  let keepRequesting = true;

  while (keepRequesting) {
    try {
      const response = await fetch(url, { headers });

      if (response.status === 200) {
        successCount++;
        statusText[idx] = `${statusText[idx].split(': ')[0]}: ${successCount}`;
      } else if (response.status === 500) {
        statusText[idx] = `${
          statusText[idx].split('] ')[0]
        }] Failed with status 500 after ${successCount} successful requests.`;
        keepRequesting = false;
      }
    } catch (error) {
      keepRequesting = false;
    } finally {
      statusOra.text = `\n${statusText.join('\n')}`;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

makeRequest(
  'https://tristan-lee-serverless-transform-catch-default.glb.edgio.link/serverless-proxy-exception',
  0
);
makeRequest(
  'https://tristan-lee-serverless-transform-catch-default.glb.edgio.link/origin-proxy-exception',
  1
);
makeRequest(
  'https://tristan-lee-serverless-transform-catch-default.glb.edgio.link/redirect-to-error',
  2
);
