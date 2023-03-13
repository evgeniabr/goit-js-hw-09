import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
  inputDate: document.querySelector('#datetime-picker'),
};
console.log(refs);

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      refs.btnStart.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');

    }
    refs.btnStart.disabled = false;
    console.log(selectedDates[0]);
  },
};

const flatPickr = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.ntervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    
  }
    start() {
    if (this.isActive) {
      return;
      }
    const startTime = flatPickr.selectedDates[0].getTime()
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime < 0) {
        clearInterval(this.intervalId);
        refs.btnStart.disabled = false;
        return;
      }
      const timeComponent = convertMs(deltaTime);
      console.log(timeComponent);
      this.onTick(timeComponent);
    }, 1000);
    refs.btnStart.disabled = true;
  }
  
  stop() {

    clearInterval(this.intervalId);
    this.isActive = false;
  }
  }

const timer = new Timer({
  onTick: updateTimer
});

function updateTimer({ days, hours, minutes, seconds }) {
refs.spanDays.textContent = days;
  refs.spanHours.textContent = hours;
  refs.spanMinutes.textContent = minutes;
  refs.spanSeconds.textContent = seconds;


}

refs.btnStart.addEventListener('click', timer.start.bind(timer));
refs.inputDate.addEventListener('click', timer.stop.bind(timer));

 function addLeadingZero(value)  {
   return String(value).padStart(2, '0');
};

 function convertMs(ms) {
   // Number of milliseconds per unit of time   
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

   // Remaining days
   const days = addLeadingZero(Math.floor(ms / day));
   // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   // Remaining seconds
   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
 }