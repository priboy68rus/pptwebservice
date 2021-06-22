const ppt = require('puppeteer');
const { BrowserHandler, wait_for_browser } = require('./browser_handler');

const URL = process.env.URL;

const browser_handler = new BrowserHandler();

const getTaxStatus = async (inn, date) => {
  if (inn === "") {
    return;
  }
  try {
    if (browser_handler.browser === false) {
      await wait_for_browser(browser_handler);
    }
    
    const page = await browser_handler.browser.newPage();
    
    await page.setDefaultNavigationTimeout(10000);
    await page.goto(URL);

    await page.waitForSelector("#ctl00_ctl00_tbINN");
    await page.focus("#ctl00_ctl00_tbINN");
    await page.keyboard.type(inn);
    
    await page.waitForSelector("#ctl00_ctl00_tbDate");
    await page.focus("#ctl00_ctl00_tbDate");
    await page.keyboard.type(date);

  

    const invalidInn = await page.$("#ctl00_ctl00_cv_Inn");
    const displayProp = await page.evaluate(
      (el) => el.style.display,
      invalidInn
    );

    let taxStatus = "";

    if (displayProp !== "none") {
      taxStatus = `invalid inn`;
    } else {
      await page.click("#ctl00_ctl00_btSend");
      await page.waitForNavigation();

      const element = await page.$("#ctl00_ctl00_lblInfo");
      const text = await page.evaluate((el) => el.textContent, element);

      taxStatus = `${text.replace(inn, "")}`.trim();
    }

    await page.close();
    return taxStatus;
    
  } catch {
    await page.close();
    return `unexpected error`;
  }
}

module.exports = {
  getTaxStatus
};