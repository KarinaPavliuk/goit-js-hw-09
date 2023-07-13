const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

console.log(startBtn);

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStart() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
}

function onStop() {
  clearTimeout(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

//dfghjkl;
