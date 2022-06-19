const pageScraper = require("./pageScraper");
const fs = require("fs");

async function scrapeAll(browserInstance, urls, name) {
  let browser;
  try {
    browser = await browserInstance;
    let scrapedData = {};
    // for (link in urls) {
    // console.log('Получил домен: '+urls[link]);
    // const url = urls[link];
    // console.log("Перехожу по адресу: " + url);
    // scrapedData[urls[link]] = await pageScraper.scraper(browser, domain);
    scrapedData[name] = await pageScraper.scraper(browser, urls);
    // }
    // scrapedData['url'] = await pageScraper.scraper(browser, urls);
    // scrapedData['HistoricalFiction'] = await pageScraper.scraper(browser, 'Historical Fiction');
    let dataPath = `${name}.json`;
    // console.log(JSON.stringify(scrapedData));
    // return JSON.stringify(scrapedData);
    fs.writeFile(dataPath, JSON.stringify(scrapedData), "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(`Данные успешно спарсены! Смотри файл ${dataPath}`);
    });
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}
module.exports = (browserInstance, urls, name) =>
  scrapeAll(browserInstance, urls, name);
