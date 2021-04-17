let fs = require("fs");
function makeHTML(source, dest, data, mapArr) {
  // Source Destination
  let html = fs.readFileSync("index.html", "utf-8");

  let newHtml = html.replace("{%Source%}", source);
  newHtml = newHtml.replace("{%Destination%}", dest);

  // ROUTE DETAILS
  // {%ROUTE_DETAILS%}

  let routeHtml = `Total time : ${mapArr[0]}<br>Total distance : ${mapArr[1]}<br>Route : ${mapArr[2]}<br>${mapArr[3]}`;

  newHtml = newHtml.replace("{%ROUTE_DETAILS%}", routeHtml);
  // `<p>${value}</p>`

  // uber html
  let uberHtml = "";
  for (let i = 0; i < 5; i++) {
    let price = data[0].Details[i].Fare;
    uberHtml += `<p>${price}</p>`;
  }

  newHtml = newHtml.replace("{%UBER_VALUES%}", uberHtml);

  // ola html
  let olaHtml = "";
  for (let i = 0; i < 5; i++) {
    let price = data[1].Details[i].Fare;
    olaHtml += `<p>${price}</p>`;
  }

  newHtml = newHtml.replace("{%OLA_VALUES%}", olaHtml);

  // meru html
  let meruHtml = "";
  for (let i = 0; i < 5; i++) {
    let price = data[2].Details[i].Fare;
    meruHtml += `<p>${price}</p>`;
  }

  newHtml = newHtml.replace("{%MERU_VALUES%}", meruHtml);

  fs.writeFileSync("index.html", newHtml);
}

module.exports.makeHTML = makeHTML;
