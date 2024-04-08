const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
stopBtn.disabled = true;
let colorChangeInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Change the background color and update the displayed color value
const changeBackgroundColor = () => {
  body.style.backgroundColor = getRandomHexColor;
  colorChangeInterval = setInterval(() => {
    const newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
  }, 1000);
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  changeBackgroundColor();
});

stopBtn.addEventListener('click', () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(colorChangeInterval);
});
