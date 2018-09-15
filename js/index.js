const MAIN_MOUSE_BUTTON = 0;

function prepareContext(canvasElement) {
  let dpr = window.devicePixelRatio || 1;
  let rect = canvasElement.getBoundingClientRect();
  canvasElement.width = rect.width * dpr;
  canvasElement.height = rect.height * dpr;
 
  let context = canvasElement.getContext("2d");
  context.scale(dpr, dpr);
  
  return context;
}

function setLineProperties(context) {
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.lineCap = "round";
  return context;
}

let clearButton = document.getElementById("clearButton");
let theCanvas = document.getElementById("theCanvas");
let theContext = prepareContext(theCanvas);
let shouldDraw = false;

theCanvas.addEventListener("mousedown", start);
theCanvas.addEventListener("mouseup", end);
theCanvas.addEventListener("mousemove", move, false);

clearButton.addEventListener("click", event => {
  clearCanvas(theContext);
});

 
function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);  
}

function start(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = true;
    setLineProperties(theContext);
    theContext.beginPath();
    let elementRect = event.target.getBoundingClientRect();
    theContext.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
  }
}

function end(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = false;
  }
}

function move(event) {
  if (shouldDraw) {
    let elementRect = event.target.getBoundingClientRect();
    theContext.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    theContext.stroke();
  }
}

