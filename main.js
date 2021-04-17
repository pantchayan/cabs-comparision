let puppeteer = require("puppeteer");
let fs = require("fs");
let process = require("process");

let uberFetch = require("./cabs/uber");
let olaFetch = require("./cabs/ola");
let meruFetch = require("./cabs/meru");

(async () => {
       let source = process.argv[2];
       let dest = process.argv[3];
       console.log(source,dest);
       let browserInstance = await puppeteer.launch({
              headless: false,
              defaultViewport: null,
              args: ["--start-maximized"],
       });


       let uberArr = await uberFetch.getUber(source, dest, browserInstance);
       let olaArr = await olaFetch.getOla(source, dest, browserInstance);
       let meruArr = await meruFetch.getMeru(source, dest, browserInstance);

       console.table(uberArr);
       console.table(olaArr);
       console.table(meruArr);
})()