const puppeteer = require('puppeteer');

const email = process.env.STRAVA_EMAIL;
const password = process.env.STRAVA_PASSWORD;

if (!email || !password) {
    console.error('Set STRAVA_EMAIL and STRAVA_PASSWORD in the environment.');
    process.exit(1);
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.strava.com/login');
    await page.click('button[class="btn-accept-cookie-banner"]');

    await page.type('input[name="email"]', email);
    await page.type('input[name="password"]', password);
    await page.click('button[id="login-button"]');
    await page.waitForNavigation();

    await page.goto('https://www.strava.com/dashboard/following/100');

    await page.evaluate(() => {
        document.querySelectorAll('[data-testid="kudos_button"]').forEach((node) => { node.click(); });
    });

    await browser.close();
})();
