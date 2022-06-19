const puppeteer = require("puppeteer");
const chromeOptions = {
  // executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: false,
  slowMo: 10,
  defaultViewport: null,
  args: [
    "--disable-setuid-sandbox",
    "--window-size=1920,1080",
    // '--proxy-server=https://64.235.204.107:3128'
  ],
  ignoreHTTPSErrors: true,
};

async function startBrowser() {
  let browser;
  try {
    console.log("Открываю браузер......");
    browser = await puppeteer.launch(chromeOptions);
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
