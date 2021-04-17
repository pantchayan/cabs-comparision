
let form = document.querySelector("form");

// input selectors
let srcSelector = document.querySelector("#source");
let destSelector = document.querySelector("#destination");
let citySelector = document.querySelector("#cities");


let arr = [];

form.addEventListener("submit", (e) => {
       e.preventDefault();
          
       if(!srcSelector.value){
              alert("Please enter source")
       }
       else if(!destSelector.value){
              alert("Please enter destination");
       }
       else{
             arr.push(citySelector.value);            
             arr.push(srcSelector.value);
             arr.push(destSelector.value);
       }
});