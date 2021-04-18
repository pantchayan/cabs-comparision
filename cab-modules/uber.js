let getUber = async (src, dest, browserInstance) => {
  try {
    let newTab = await browserInstance.newPage();
    await newTab.goto("https://www.uber.com/in/en/price-estimate/");

    await newTab.type("input[name='destination']", dest, { delay: 300 });

    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");

    await newTab.type("input[name='pickup']", src, { delay: 400 });
    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    }
    await delay(3000);
    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");

    await newTab.type("input[name='destination']", dest, { delay: 300 });

    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");

    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    }
    await delay(3000);

    await newTab.waitForSelector(".d9>button", { visible: true });
    await newTab.click(".d9>button");

    let consoleFn = () => {
      let arr = document.querySelectorAll(".pe-products-item");
      let detailsArr = [];
      let bCount = 0;
      let hCount = 0;
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i].innerText.split("\n");
        if (item[0] == "Moto") {
          if (bCount > 0) continue;
          bCount++;
          detailsArr.push({
            Type: "Bike",
            Fare: item[1].split("₹")[1].split(",").join(""),
          });
        } else if (item[0] == "UberAuto") {
          detailsArr.push({
            Type: "Auto",
            Fare: item[1].split("₹")[1].split(",").join(""),
          });
        } else if (item[0] == "UberGo") {
          if (hCount > 0) continue;
          hCount++;
          detailsArr.push({
            Type: "Hatchback",
            Fare: item[1].split("₹")[1].split(",").join(""),
          });
        } else if (item[0] == "Premier") {
          detailsArr.push({
            Type: "Sedan",
            Fare: item[1].split("₹")[1].split(",").join(""),
          });
        } else if (item[0] == "UberXL") {
          detailsArr.push({
            Type: "SUV",
            Fare: item[1].split("₹")[1].split(",").join(""),
          });
        }
      }

      return detailsArr;
    };

    return newTab.evaluate(consoleFn);
  } catch (err) {
    console.log("ERROR CAUGHT IN main.js> pdfconverter()  \n", err);
  }
};

module.exports.getUber = getUber;
