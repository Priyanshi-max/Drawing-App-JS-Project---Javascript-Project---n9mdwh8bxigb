const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const size = document.querySelector(".stoke-size");
const color = document.querySelector("#color");
const clear = document.querySelector(".clear");
const tipOfDay = document.querySelector(".tip") 
let stokeWidth = 10;
let strokeColor = "black";
window.addEventListener("load",()=>{
 canvas.width = window.innerWidth-60;
 canvas.height = 400;
   let painting = false;
   function startingPosition(e){
    painting = true;
    draw(e);
   }
   function endPosition(){
    painting = false;
    ctx.beginPath();
   }
   function draw(e){
    if(!painting) return;
    ctx.lineWidth= stokeWidth;
    size.textContent = stokeWidth;
    ctx.lineCap ="round";
    ctx.lineTo(e.clientX,e.clientY)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX,e.clientY);
    ctx.strokeStyle =strokeColor;

   }
canvas.addEventListener("mousedown",startingPosition);
canvas.addEventListener("mouseup",endPosition);
canvas.addEventListener("mousemove",draw);
});
plus.addEventListener("click",()=>{
   stokeWidth = stokeWidth+1;
   ctx.lineWidth = stokeWidth;
size.textContent = stokeWidth;
console.log(stokeWidth)
})
minus.addEventListener("click",()=>{
  if(stokeWidth > 1){
  stokeWidth = stokeWidth-1;
  ctx.lineWidth = stokeWidth;
  size.textContent = stokeWidth;
  }
})
color.addEventListener("change",(e)=>{
  strokeColor =e.target.value;
})
clear.addEventListener("click",()=>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

fetch('https://api.adviceslip.com/advice')
  .then((response) => response.json())
  .then((data) => tipOfDay.textContent = data.slip.advice);
