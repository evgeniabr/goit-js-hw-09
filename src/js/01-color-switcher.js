const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

btnStart.addEventListener("click", () => {
  timerId = setInterval(() => {
    changeRandomColor();
  }, 1000);
    btnStart.disabled = true;
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeRandomColor() {
  document.body.style.backgroundColor = getRandomHexColor();
  
}

btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    btnStart.disabled = false;
  
});
