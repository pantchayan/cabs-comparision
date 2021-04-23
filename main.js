// Node modules
let puppeteer = require("puppeteer");
let fs = require("fs");
let process = require("process");

// Self modules
let graphPlot = require("./graphPlot");
let htmlFormat = require("./htmlFormat");
let map = require("./map");
let notify = require("./notifications");

// Cab modules
let uberFetch = require("./cab-modules/uber");
let olaFetch = require("./cab-modules/ola");
let meruFetch = require("./cab-modules/meru");

(async () => {
  try {
    let source = process.argv[2];
    let dest = process.argv[3];
    console.log("Fetching data for cabs\nFROM: " + source + "\nTO: " + dest);
    let browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    let data = [];

    console.log("\nGetting Route Data...");
    let mapArr = await map.getMap(source, dest, browserInstance);
    console.log("Route data fetched successfully...");
    console.log("\nFetching prices for:");
    console.log("UBER...");
    let uberArr = await uberFetch.getUber(source, dest, browserInstance);
    console.log("OLA...");
    let olaArr = await olaFetch.getOla(source, dest, browserInstance);
    console.log("MERU...");
    let meruArr = await meruFetch.getMeru(source, dest, browserInstance);

    data.push({
      Service: "Uber",
      Details: uberArr,
    });

    data.push({
      Service: "Ola",
      Details: olaArr,
    });

    data.push({
      Service: "Meru",
      Details: meruArr,
    });

    console.log("\nPrices fetched...\nProcessing data... ");

    fs.writeFileSync("./data/fares.json", JSON.stringify(data));
    // console.table(uberArr);
    // console.table(olaArr);
    // console.table(meruArr);

    // let data = fs.readFileSync("./data/fares.json");
    // data = JSON.parse(data);
    // console.log(data);

    // PLOTTING GRAPH
    console.log("\nPlotting graph...");
    await graphPlot.makeGraph(data);
    console.log("\nGraph plotted...");

    // MAKING TABLE
    console.log("\nFormatting html...");
    await htmlFormat.makeHTML(source, dest, data, mapArr);
    console.log("\nHtml file is ready...");
    // GENERATING PDF
    console.log("\nGenerating pdf...");
    await pdfconverter();
    browserInstance.close();

    console.log("\nSending mail...");

    let email = fs.readFileSync("./data/credentials.txt", "utf-8");
    await notify.gmailsend(email);

    // console.log("\nSending whatsapp...");
    // await notify.whatsappNotify(email);

    console.log("\nWork finished...");
  } catch (err) {
    console.log("ERROR CAUGHT IN main.js  \n", err);
  }
})();

async function pdfconverter() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const tab = await browser.newPage();
    await tab.goto(
      "C:\\Users\\pantc\\WebDev\\Activities\\Self\\cabs-comparision\\index.html",
      {
        waitUntil: "load",
        timeout: 0,
      }
    );
    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    }
    await delay(4000);

    await tab.pdf({ path: "./data/results.pdf" });
    browser.close();
  } catch (err) {
       console.log("ERROR CAUGHT IN main.js> pdfconverter()  \n", err);
  }
}
