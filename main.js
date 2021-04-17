let puppeteer = require("puppeteer");
let fs = require("fs");
let process = require("process");

let uberFetch = require("./cabs/uber");
let olaFetch = require("./cabs/ola");
let meruFetch = require("./cabs/meru");

let getCabDetails = async (city, source, dest) => {
       console.log(source,dest,city);
       let browserInstance = await puppeteer.launch({
              headless: false,
              defaultViewport: null,
              args: ["--start-maximized"],
       });


       let uberArr = await uberFetch.getUber(city, source, dest, browserInstance);
       // let olaArr = await getOla(city, source, dest, browserInstance);
       let meruArr = await meruFetch.getMeru(city, source, dest, browserInstance);

       console.table(uberArr);
       // console.table(olaArr);
       console.table(meruArr);
}


getCabDetails("Delhi", process.argv[2], process.argv[3]);