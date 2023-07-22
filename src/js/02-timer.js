import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from './dateConvert';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let timeDifference;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onPickrClose,
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', onStart);
resetBtn.addEventListener('click', onReset);

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
  inputEl.disabled = true;
  resetBtn.disabled = false;

  const convertedTime = convertMs(timeDifference);
  renderTime(convertedTime);

  timerId = setInterval(runTimer, 1000);
}

function onReset() {
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';

  clearInterval(timerId);

  inputEl.disabled = false;
  resetBtn.disabled = true;
}

function renderTime({ days, hours, minutes, seconds }) {
  const convertedDays = addLeadingZero(days);
  const convertedHours = addLeadingZero(hours);
  const convertedMinutes = addLeadingZero(minutes);
  const convertedSeconds = addLeadingZero(seconds);

  daysEl.textContent = convertedDays;
  hoursEl.textContent = convertedHours;
  minutesEl.textContent = convertedMinutes;
  secondsEl.textContent = convertedSeconds;

  if (
    convertedDays === '00' &&
    convertedHours === '00' &&
    convertedMinutes === '00' &&
    convertedSeconds === '00'
  ) {
    clearInterval(timerId);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function runTimer() {
  timeDifference -= 1000;
  const convertedTime = convertMs(timeDifference);
  renderTime(convertedTime);
}
