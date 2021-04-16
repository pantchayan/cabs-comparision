let form = document.querySelector("form");

// input selectors
let srcSelectors = document.querySelector("#source");
let destSelectors = document.querySelector("#destination");
let citySelectors = document.querySelector("#cities");

form.addEventListener("submit", (e) => {
       e.preventDefault();
       
       if(!srcSelectors.value){
              alert("Please enter source")
       }
       else if(!destSelectors.value){
              alert("Please enter destination");
       }
       else{
              getCabDetails(citySelectors.value, srcSelectors.value, destSelectors.value);
       }
});

let getCabDetails = async (city, source, dest) => {
       console.log(source,dest,city);
       let browserInstance = await puppeteer.launch({
              headless: false,
              defaultViewport: null,
              args: ["--start-maximized"],
       });

       
       // let uberArr = await getUber(city, source, dest);
       // let olaArr = await getOla(city, source, dest);
       // let meruArr = await getMeru(city, source, dest);

       // console.table(uberArr);
       // console.table(olaArr);
       // console.table(meruArr);
}