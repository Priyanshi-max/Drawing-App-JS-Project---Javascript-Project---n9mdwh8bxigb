const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const size = document.querySelector(".stoke-size");
const color = document.querySelector("#color");
const clear = document.querySelector(".clear");
const tipOfDay = document.querySelector(".tip");
let stokeWidth = 10;
let strokeColor = "black";

function setCanvasSize() {
  canvas.width = window.innerWidth - 50;
  canvas.height = 400;
}

setCanvasSize(); // Set initial canvas size

let painting = false;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  const { clientX, clientY } = e.touches ? e.touches[0] : e;
  ctx.lineWidth = stokeWidth;
  ctx.lineCap = "round";
  ctx.lineTo(clientX, clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(clientX, clientY);
  ctx.strokeStyle = strokeColor;
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);

plus.addEventListener("click", () => {
  stokeWidth += 1;
  ctx.lineWidth = stokeWidth;
  size.textContent = stokeWidth;
});

minus.addEventListener("click", () => {
  if (stokeWidth > 1) {
    stokeWidth -= 1;
    ctx.lineWidth = stokeWidth;
    size.textContent = stokeWidth;
  }
});

color.addEventListener("change", (e) => {
  strokeColor = e.target.value;
});

clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

fetch("https://api.adviceslip.com/advice")
  .then((response) => response.json())
  .then((data) => (tipOfDay.textContent = data.slip.advice));

// Responsive handling
window.addEventListener("resize", setCanvasSize);
