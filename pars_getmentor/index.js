const browserObject = require("./browser");
const scraperController = require("./pageController");

// let url = "http://127.0.0.1:5500/";
// let url = "http://127.0.0.1:5500/publ/";
let url = "http://127.0.0.1:5500/index/0-97/";
// let url = "http://127.0.0.1:5500/publ/sudba_very_beglovoj/20-1-0-195";

// // for (link in urls) {
// //   // const domain = new URL(urls[link]).pathname.replace('stat/', '');
// //   console.log('__'+urls[link]);

// //   // scrapedData[domain] = await pageScraper.scraper(browser, urls[link]);
// // }
async function start() {
  let browserInstance = browserObject.startBrowser();
  let arr = require("./links_");
  for (var key of Object.keys(arr)) {
    await scraperController(browserInstance, arr[key], key);
    // console.log(arr[key]);
  }
  let browser = await browserInstance;
  await browser.close();
}
start();
// console.log();

// scraperController(browserInstance, urls, );
