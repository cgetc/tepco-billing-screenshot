var puppeteer =　require('puppeteer');

const screenshotFilepath = '/github/workspace/screenshot.png';
const env = (name) => process.env[name] || '';

const retry = async (run) => {
  let i = 0; 
  while (true) {
    try {
      return await run();
    } catch (e) {
      if (i >= 3) throw e;
      ++i;
    }
  }
};

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const selectValue = (select, value) => {
    for (var i = 0; i < select.options.length; i++ ) {
      const option = select.options[i]
      if (option.textContent == value) {
        select.value = option.value;
        break;
      }
    }
    const event = document.createEvent('HTMLEvents');
    event.initEvent('change', false, true);
    select.dispatchEvent(event);
  };

  try {
    console.log('go to top page.');
    await retry(async () => {
        await page.goto('https://www.kenshin.tepco.co.jp/');
        await page.click('.notes-open-top');
        await page.waitForSelector('#nextButton');
        await page.click('#nextButton');
        await page.waitForNavigation({waitUntil: 'domcontentloaded', timeout: 120000});
    });

    console.log('input name.');
    if (env('OPTIONS') === '1') {
      await page.click('input[name="options"][value="1"]');
      await page.type('input[name="firstName"]', env('FIRST_NAME'));
      await page.type('input[name="lastName"]', env('LAST_NAME'));
    } else {
      await page.click('input[name="options"][value="0"]');
      await page.type('input[name="companuName"]', env('COMPANY_NAME'));
      await page.type('input[name="departmentName"]', env('DEPARTMENT_NAME'));
    }

    console.log('input address.');

    await retry(async () => {
      await page.type('input[name="zipCode1"]', env('ZIP_CODE1'));
      await page.type('input[name="zipCode2"]', env('ZIP_CODE2'));
      await page.waitForSelector('#searchAddress:not(:disabled)');
      await page.waitForSelector('select[name="prefectureCode"] option[value="01"]');
    });

    await retry(async () => {
      const prefectureSelect = await page.$('select[name="prefectureCode"]');
      await page.evaluate(selectValue, prefectureSelect, env('PREFECTURE'));
      await page.waitForSelector('select[name="cityCode"]:not(:disabled)');
    });
    await retry(async () => {
      const citySelect = await page.$('select[name="cityCode"]');
      await page.evaluate(selectValue, citySelect, env('CITY'));
      await page.waitForSelector('select[name="address1Code"]:not(:disabled)');
    });
    await retry(async () => {
      const address1Select = await page.$('select[name="address1Code"]');
      await page.evaluate(selectValue, address1Select, env('ADDRESS1'));
      await page.waitForSelector('select[name="address2Code"]:not(:disabled)');
    });
    await retry(async () => {
      const address2Select = await page.$('select[name="address2Code"]');
      await page.evaluate(selectValue, address2Select, env('ADDRESS2'));
      await page.type('input[name="addressBanchi"]', env('ADDRESS_BANCHI'));
      await page.type('input[name="addressGou"]', env('ADDRESS_GOU'));
      await page.type('input[name="addressRoomNm"]', env('ADDRESS_ROOM_NM'));
    });

    console.log('input code.');
    await page.type('input[name="officeCode"]', env('OFFICE_CODE'));
    await page.type('input[name="visitNumber1"]', env('VISIT_NUMBER1'));
    await page.type('input[name="visitNumber2"]', env('VISIT_NUMBER2'));
    await page.type('input[name="visitNumber3"]', env('VISIT_NUMBER3'));
    await page.type('input[name="visitNumber4"]', env('VISIT_NUMBER4'));

    console.log('submit form.');
    const form = await page.$('.identificationForm');
    await page.evaluate(form => { form.submit(); }, form);

    await page.waitForNavigation({waitUntil: 'domcontentloaded'});
  } catch (e) {
    console.error(e);
  } finally {
    console.log('take screenshot ' + screenshotFilepath);
    await page.screenshot({path: screenshotFilepath, fullPage: true});
    await browser.close();
  }
})();
