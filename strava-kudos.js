const puppeteer = require('puppeteer');

(async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto('https://www.strava.com/dashboard/following/100');

      await page.evaluate(() => {
              document.querySelectorAll('[data-testid="kudos_button"]').forEach((node) => {
                        node.click();
                      });
            });

      await browser.close();
})();
