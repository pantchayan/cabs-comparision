
let getMeru = async (src, dest, browserInstance) => {
  try {
    let newTab = await browserInstance.newPage();
    await newTab.goto("https://www.meru.in/");

    // #select2-chosen-1
    await newTab.waitForSelector("#select2-chosen-1", { visible: true });
    await newTab.click("#select2-chosen-1");
    await newTab.click("#select2-chosen-1");
    await new Promise((r) => setTimeout(r, 1000));
    await newTab.type("#s2id_autogen1_search", "   " + dest, { delay: 200 });
    await new Promise((r) => setTimeout(r, 2000));
    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");

    //#select2-drop-mask
    await newTab.click("#select2-drop-mask");
    // select2-chosen-2

    await newTab.waitForSelector("#select2-chosen-2", { visible: true });
    await newTab.click("#select2-chosen-2");

    await new Promise((r) => setTimeout(r, 1000));
    await newTab.type("#s2id_autogen2_search", src, { delay: 200 });
    await new Promise((r) => setTimeout(r, 2000));
    await newTab.keyboard.press("Enter");
    await newTab.keyboard.press("Enter");

    await newTab.click("#select2-drop-mask");
    // .swap_location
    await newTab.waitForSelector(".swap_location", { visible: true });
    await newTab.click(".swap_location");

    await newTab.waitForSelector(".fare_sedan .fare_cost", { visible: true });

    // let sedan = document.querySelector(".fare_sedan .fare_cost");
    // sedan.innerText

    let consoleFn = () => {
      let detailsArr = [];
      detailsArr.push({
        Type: "Bike",
        Fare: "NOT AVAILABLE",
      });
      detailsArr.push({
        Type: "Auto",
        Fare: "NOT AVAILABLE",
      });
      let arr = document.querySelectorAll(".fare_cost");
      let sprice = 0;
      for (let i = 0; i < 3; i++) {
        let price = arr[i].innerText.split(" ")[1].split("-")[0];

        if (i == 0) {
          sprice = price;
        } else if (i == 1) {
          detailsArr.push({
            Type: "Hatchback",
            Fare: price,
          });
          detailsArr.push({
            Type: "Sedan",
            Fare: sprice,
          });
        } else {
          detailsArr.push({
            Type: "SUV",
            Fare: price,
          });
        }
      }
      return detailsArr;
    };

    return newTab.evaluate(consoleFn);
  } catch (err) {
    console.log("ERROR CAUGHT IN meru.js \n", err);
  }
};

module.exports.getMeru = getMeru;
