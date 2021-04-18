let links = [
  "https://www.taxifarefinder.com/main.php?city=Ola-Bike-Delhi",
  "https://www.taxifarefinder.com/main.php?city=Ola-Auto-Delhi-India",
  "https://www.taxifarefinder.com/main.php?city=Ola-Mini-Delhi-India",
  "https://www.taxifarefinder.com/main.php?city=Ola-Sedan-Mathura-India",
  "https://www.taxifarefinder.com/main.php?city=Ola-Prime-SUV-Delhi",
];

let getOla = async (src, dest, browserInstance) => {
  try {
    let detailsArr = [];
    for (let i = 0; i < links.length; i++) {
      let price = await getItem(browserInstance, links[i], src, dest);
      if (i == 0) {
        detailsArr.push({
          Type: "Bike",
          Fare: price,
        });
      } else if (i == 1) {
        detailsArr.push({
          Type: "Auto",
          Fare: price,
        });
      } else if (i == 2) {
        detailsArr.push({
          Type: "Hatchback",
          Fare: price,
        });
      } else if (i == 3) {
        detailsArr.push({
          Type: "Sedan",
          Fare: price,
        });
      } else {
        detailsArr.push({
          Type: "SUV",
          Fare: price,
        });

        return detailsArr;
      }
    }
  } catch (err) {
    console.log("ERROR CAUGHT IN ola.js>getOla()  \n", err);
  }
};

let getItem = async (browserInstance, link, src, dest) => {
  try {
    let newTab = await browserInstance.newPage();
    await newTab.goto(link, { waitUntil: "load", timeout: 0 });
    await newTab.setDefaultNavigationTimeout(0);
    await newTab.waitForSelector("#fromAddress", { visible: true });

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

    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    }
    await delay(3000);

    await newTab.waitForSelector(".fareValue");
    //.fareValue
    let consolefn = () => {
      let fare = document.querySelector(".fareValue");
      return fare.innerText.split("₹")[1].split(",").join("");
    };

    return newTab.evaluate(consolefn);
  } catch (err) {
    console.log("ERROR CAUGHT IN ola.js>getItem()  \n", err);
  }
};

module.exports.getOla = getOla;
