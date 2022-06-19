const { text } = require("express");

const scraperObject = {
  async scraper(browser, urls, domain = null) {
    // let page = await browser.newPage();
    // await page.goto(domain);

    let scrapedData = [];

    async function scrapeCurrentPage(urls) {
      // let urls = await page.$$eval(".eBlock", (links) => {
      //   // Make sure the book to be scraped is in stock
      //   // links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
      //   links = links.map((el) => el.querySelector(".eTitle > a").href);
      //   return links;
      // });

      let pagePromise = (domain) =>
        new Promise(async (resolve, reject) => {
          try {
            const article = false;
            const dataObj = {};
            let page = await browser.newPage();
            const megaindex = domain;
            console.log(`Перехожу по адресу: ${megaindex}`);
            await page.goto(megaindex, { waitUntil: "networkidle2" });
            await page
              .waitForSelector(".eTitle")
              .then(async () => {
                console.log("SUCCESS");
                dataObj["title"] = await page.$eval(".eTitle", (text) =>
                  text ? text.textContent : ""
                );
                console.log(dataObj["title"]);
                // if (article) {
                //   //статьи
                //   dataObj["body"] = await page.$eval(".eBlock", (text) =>
                //     text ? text.textContent.split("\n Категория")[0] : ""
                //   );

                //   let details = await page.$eval(".eDetails1", (text) =>
                //     text
                //       ? text.textContent
                //           .split("|")
                //           .map((el) => el.trim().split(":"))
                //       : ""
                //   );

                //   dataObj["details"] = Object.fromEntries(details);
                // } else {
                // let images = await page.$$eval("td>span img", (el) => el.length );
                const images = await page.$$eval("td>span img", (divs) =>
                  divs.map((el) => el.src)
                );
                console.log(images);
                // dataObj["images"] = Object.fromEntries(images);
                // }

                //страницы
                dataObj["body"] = await page.$eval("td>span", (text) =>
                  text ? text.innerText : ""
                );

                await page.close();
                console.log("Done!");
                resolve(dataObj);
              })
              .catch(async (e) => {
                console.log("FAIL");
                dataObj["title"] = "Not data";
                resolve(dataObj);
                await page.close();
                // reject(e);
              });
          } catch (err) {
            console.log("Ошибка => ", err);
          }
        });
      // let currentPageData = await parseMegaindex(domain);
      // scrapedData.push(currentPageData);
      // return scrapedData;
      for (link in urls) {
        console.log("Opening " + urls[link]);
        let currentPageData = await pagePromise(urls[link]);
        scrapedData.push(currentPageData);
      }

      // let nextButtonExist = false;
      // try {
      //   const nextButton = await page.$eval(".next > a", (a) => a.textContent);
      //   nextButtonExist = true;
      // } catch (err) {
      //   nextButtonExist = false;
      // }
      // if (nextButtonExist) {
      //   await page.click(".next > a");
      //   return scrapeCurrentPage(); // Call this function recursively
      // }
      // await page.close();
      return scrapedData;
    }

    let data = await scrapeCurrentPage(urls);
    // console.log(data);
    return data;
    // return scrapedData;
  },
};

module.exports = scraperObject;
