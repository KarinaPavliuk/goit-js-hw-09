import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from './dateConvert';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let timeDifference;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onPickrClose,
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', onStart);

function onPickrClose(selectedDates) {
  const currentTime = Date.now();

  const selectedTime = selectedDates[0].getTime();

  if (selectedTime > currentTime) {
    startBtn.disabled = false;
    timeDifference = selectedTime - currentTime;
  } else {
    startBtn.disabled = true;
    Notify.failure('Please choose a date in the future');
  }
}

function onStart() {
  startBtn.disabled = true;

  const convertedTime = convertMs(timeDifference);
  renderTime(convertedTime);

  setInterval(runTimer, 1000);
}

function renderTime({ days, hours, minutes, seconds }) {
  const convertedDays = addLeadingZero(days);
  const convertedHours = addLeadingZero(hours);
  const convertedMinutes = addLeadingZero(minutes);
  const convertedSeconds = addLeadingZero(seconds);

  daysEl.innerText = convertedDays;
  hoursEl.innerText = convertedHours;
  minutesEl.innerText = convertedMinutes;
  secondsEl.innerText = convertedSeconds;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function runTimer() {
  timeDifference -= 1000;
  const convertedTime = convertMs(timeDifference);
  renderTime(convertedTime);
}
