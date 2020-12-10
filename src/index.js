var puppeteer =　require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.kenshin.tepco.co.jp/Certification');
  await page.screenshot({path: '/home/pptruser/Downloads/example.png', fullPage: true});

  await browser.close();
})();
