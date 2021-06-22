const puppeteer = require('puppeteer');

class BrowserHandler {
  constructor() {
    const launch_browser = async () => {
      this.browser = false;
      this.browser = await puppeteer.launch({ 
        headless: true, 
        args: [
        '--disable-features=site-per-process',
        '--no-sandbox',
        '--disable-setuid-sandbox'
        ], 
      });
      this.browser.on('disconnected', launch_browser);
    };
    
    (async () => {
      await launch_browser();
    })();
  }
}

const wait_for_browser = browser_handler => new Promise((resolve, reject) => {
  const browser_check = setInterval(() => {
    if (browser_handler.browser !== false) {
      clearInterval(browser_check);
      resolve(true);
    }
  }, 100 );
});

module.exports = {
  BrowserHandler,
  wait_for_browser
}