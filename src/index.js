var puppeteer =　require('puppeteer');

const env = (name) => process.env[name] || '';

const captureTepcoBilling = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const waitOptions = {timeout: 30000};
  try {
    await page.goto('https://www.kenshin.tepco.co.jp/Certification');
    await page.type('input[name="officeCode"]', env('OFFICE_CODE'));
    await page.type('input[name="visitNumber1"]', env('VISIT_NUMBER1'));
    await page.type('input[name="visitNumber2"]', env('VISIT_NUMBER2'));
    await page.type('input[name="visitNumber3"]', env('VISIT_NUMBER3'));
    await page.type('input[name="visitNumber4"]', env('VISIT_NUMBER4'));
    await page.type('input[name="zipCode1"]', env('ZIP_CODE1'));
    await page.type('input[name="zipCode2"]', env('ZIP_CODE2'));
    await page.waitForSelector('#searchAddress:not(:disabled)', waitOptions);
    await page.select('select[name="prefectureCode"]', env('PREFECTURE_CODE'));
    await page.waitForSelector('select[name="cityCode"]:not(:disabled)', waitOptions);
    await page.select('select[name="cityCode"]', env('CITY_CODE'));
    await page.waitForSelector('select[name="address1Code"]:not(:disabled)', waitOptions);
    await page.select('select[name="address1Code"]', env('ADDRESS1_CODE'));
    await page.waitForSelector('select[name="address2Code"]:not(:disabled)', waitOptions);
    await page.select('select[name="address2Code"]', env('ADDRESS2_CODE'));
    await page.type('input[name="addressBanchi"]', env('ADDRESS_BANCHI'));
    await page.type('input[name="addressGou"]', env('ADDRESS_GOU'));
    await page.type('input[name="apartment"]', env('APARTMENT'));
    await page.type('input[name="addressTou"]', env('ADDRESS_TOU'));
    await page.type('input[name="addressRoomNm"]', env('ADDRESS_ROOM_NM'));
    if (env('OPTIONS') === '1') {
        await page.click('input[name="options"][value="1"]');
        await page.type('input[name="firstName"]', env('FIRST_NAME'));
        await page.type('input[name="lastName"]', env('LAST_NAME'));
    } else {
        await page.click('input[name="options"][value="0"]');
        await page.type('input[name="companuName"]', env('COMPANY_NAME'));
        await page.type('input[name="departmentName"]', env('DEPARTMENT_NAME'));
    }
    await page.type('input[name="phoneNumber1"]', env('PHONE_NUMBER1'));
    await page.type('input[name="phoneNumber2"]', env('PHONE_NUMBER2'));
    await page.type('input[name="phoneNumber3"]', env('PHONE_NUMBER3'));

    const form = await page.$('.certificationForm');
    await page.evaluate(form => { form.submit(); }, form);

    await page.waitForNavigation();
  } finally {
    await page.screenshot({path: '/home/pptruser/Downloads/example.png', fullPage: true});
    await browser.close();
  }
};

(async () => {
    await captureTepcoBilling();
})();
