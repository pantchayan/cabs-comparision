async function getMap(src, dest, browserInstance){
       let newTab = await browserInstance.newPage();
       await newTab.goto("https://www.google.com/maps",{
              waitUntil: "networkidle2",
       });
       await newTab.waitForSelector("button[aria-label='Directions']", {visible:true});
       await newTab.click("button[aria-label='Directions']");

       await newTab.waitForSelector("#sb_ifc51");

       await newTab.type("#sb_ifc51",src, {delay:200});
       await Promise.all([newTab.waitForNavigation({
              waitUntil:"networkidle2",
              
       }),newTab.keyboard.press('Enter')]);
       
       await newTab.type("#sb_ifc52",dest, {delay:200});
       await Promise.all([newTab.waitForNavigation({
              waitUntil:"networkidle2",
              
       }),newTab.keyboard.press('Enter')]);

       await newTab.waitForSelector('.section-directions-trip.clearfix',{visible : true});

       let consolefn = () => {
              let x = document.querySelector("#section-directions-trip-0");
              return x.innerText.split("\n")
       }


       
       let arr =  await newTab.evaluate(consolefn);

       function delay(time) {
              return new Promise(function(resolve) { 
                  setTimeout(resolve, time)
              });
       }
       await delay(4000);
       await newTab.screenshot({path : './data/map_screenshot.png', clip :{ x:410, y:0 ,width :960 ,height:650 }})
       
       return arr;
}

module.exports.getMap = getMap;