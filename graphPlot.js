let fs = require("fs");
function makeGraph (data) {
       let html = fs.readFileSync("template.html","utf-8");
       // [
       //        ['Types', 'Uber', 'Ola', 'Meru'],
       //        ['Bike', 1000, 400, 200],
       //        ['Auto', 1170, 460, 250],
       //        ['Hatchback', 660, 1120, 300],
       //        ['Sedan', 1030, 540, 350],
       //        ['SUV', 1030, 540, 350]
       //      ]
       let arr = [['Types', 'Uber', 'Ola', 'Meru']]

       for(let j=0;j<5;j++){
              let newArr = [];
              if(j==0){
                     newArr.push('Bike');
              }
              if(j==1){
                     newArr.push('Auto');
              }
              if(j==2){
                     newArr.push('Hatchback');
              }
              if(j==3){
                     newArr.push('Sedan');
              }
              if(j==4){
                     newArr.push('SUV');
              }
              for(let i=0;i<data.length;i++){
                     let price = data[i]["Details"][j].Fare;
                     if(price==="NOT AVAILABLE"){
                            newArr.push(0);
                     }
                     else{
                            newArr.push(Number(price));
                     } 
              }
              arr.push(newArr);
       }
       console.log(arr);
       let newHtml = html.replace("{DATA_VALUES}",JSON.stringify(arr));
       fs.writeFileSync("index.html",newHtml);
}

module.exports.makeGraph = makeGraph;