import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysClock: document.querySelector('span[data-days]'),
  hoursClock: document.querySelector('span[data-hours]'),
  minutesClock: document.querySelector('span[data-minutes]'),
  secondsClock: document.querySelector('span[data-seconds]'),
  inputDate: document.querySelector('#datetime-picker'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      refs.startBtn.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    console.log(selectedDates[0]);
  },
};
const flatPickr = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
    this.intervalId = null;
  }
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = flatPickr.selectedDates[0].getTime();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        refs.startBtn.disabled = false;
        return;
      }
      const time = convertMs(deltaTime);
      this.onTick(time);
    }, 1000);
    refs.startBtn.disabled = true;
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

const timer = new Timer({
  onTick: updateClockFace,
});

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysClock.textContent = `${days}`;
  refs.hoursClock.textContent = `${hours}`;
  refs.minutesClock.textContent = `${minutes}`;
  refs.secondsClock.textContent = `${seconds}`;
}

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.inputDate.addEventListener('click', timer.stop.bind(timer));

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
