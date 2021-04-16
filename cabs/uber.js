
let getUber = async (city, src, dest, browserInstance) => {
    let newTab = await browserInstance.newPage();
    await newTab.goto("https://www.uber.com/in/en/price-estimate/");
    
    await newTab.type("input[name='destination']", dest, { delay: 300 });
    
    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");

    await newTab.type("input[name='pickup']", src, { delay: 300 });
   
    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");

    await newTab.type("input[name='destination']", dest, { delay: 300 });
    
    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");


    await newTab.waitForSelector(".d9>button", {visible:true});
    await newTab.click(".d9>button");

    let consoleFn = () => {
       let arr = document.querySelectorAll(".pe-products-item");
       let detailsArr = [];
       for(let i=0;i<arr.length;i++){
              let item = arr[i].innerText.split("\n");
              if(item[0]=="Moto"){
                     detailsArr.push({
                            "Type" : "Bike",
                            "Fare" : item[1].split("₹")[1]
                     })
              }
              else if(item[0]=="UberAuto"){
                     detailsArr.push({
                            "Type" : "Auto",
                            "Fare" : item[1].split("₹")[1]
                     })
              }
              else if(item[0]=="UberGo"){
                     detailsArr.push({
                            "Type" : "Hatchback",
                            "Fare" : item[1].split("₹")[1]
                     })
              }
              else if(item[0]=="Premier"){
                     detailsArr.push({
                            "Type" : "Sedan",
                            "Fare" : item[1].split("₹")[1]
                     })
              }
              else if(item[0]=="UberXL"){
                     detailsArr.push({
                            "Type" : "SUV",
                            "Fare" : item[1].split("₹")[1]
                     })
              }
       }

       return detailsArr;
    }

    return newTab.evaluate(consoleFn);
}

module.exports.getUber = getUber;