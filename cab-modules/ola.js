// let puppeteer = require("puppeteer");
// let fs = require("fs");

let links = [
  "https://www.taxifarefinder.com/main.php?city=Ola-Bike-Delhi",
  "https://www.taxifarefinder.com/main.php?city=Ola-Auto-Delhi-India",
  "https://www.taxifarefinder.com/main.php?city=Ola-Mini-Delhi-India",
  "https://www.taxifarefinder.com/main.php?city=Ola-Sedan-Mathura-India",
  "https://www.taxifarefinder.com/main.php?city=Ola-Prime-SUV-Delhi",
];

let getOla = async (src, dest, browserInstance) => {
       let detailsArr = [];
       for (let i = 0; i < links.length; i++) {
              let price = await getItem(browserInstance, links[i],src,dest);
              if(i==0){
                     detailsArr.push({
                            "Type" : "Bike",
                            "Fare" : price
                     })
              }
              else if(i==1){
                     detailsArr.push({
                            "Type" : "Auto",
                            "Fare" : price
                     })
              }
              else if(i==2){
                     detailsArr.push({
                            "Type" : "Hatchback",
                            "Fare" : price
                     })
              }
              else if(i==3){
                     detailsArr.push({
                            "Type" : "Sedan",
                            "Fare" : price
                     })
              }
              else{
                     detailsArr.push({
                            "Type" : "SUV",
                            "Fare" :price
                     })
                     
                     return detailsArr;
              }
       }
};


let getItem = async (browserInstance,link,src,dest) => {
       let newTab = await browserInstance.newPage();
       await newTab.goto(link ,{waitUntil: 'load', timeout: 0});
       await newTab.setDefaultNavigationTimeout(0); 
       await newTab.waitForSelector("#fromAddress", {visible:true});
       

       await newTab.type("#fromAddress", src, { delay: 100 });
       await new Promise((r) => setTimeout(r, 2000));
       await newTab.keyboard.press("Enter");
       await newTab.keyboard.press("Enter");

       await newTab.type("#toAddress", dest, { delay: 100 });
       await new Promise((r) => setTimeout(r, 2000));
       await newTab.keyboard.press("Enter");
       await newTab.keyboard.press("Enter");


       //.form-goButton
       await new Promise((r) => setTimeout(r, 2000));
       await newTab.click(".form-goButton");
       await new Promise((r) => setTimeout(r, 2000));
       await newTab.click(".form-goButton");
       await new Promise((r) => setTimeout(r, 2000));
       await newTab.click(".form-goButton");

       await newTab.waitForSelector(".fareValue");
       //.fareValue
       let consolefn = () => {
              let fare = document.querySelector(".fareValue");
              return fare.innerText.split("₹")[1].split(",").join("");
       }

       return newTab.evaluate(consolefn);
}

module.exports.getOla = getOla;
