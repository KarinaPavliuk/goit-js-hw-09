import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from './dateConvert';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('input');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

startBtn.setAttribute('disabled', true);

flatpickr(inputEl, options);

startBtn.addEventListener('click', onStart);

window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);

    inputEl.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);

    secondsEl.textContent = '00';
    minutesEl.textContent = '00';
    hoursEl.textContent = '00';
    daysEl.textContent = '00';
  }
});

function onStart() {
  timerId = setInterval(startTimer, 1000);
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    startBtn.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);
  console.log('timeDifference', timeDifference);

  renderDate(formatDate);
  startBtn.removeAttribute('disabled');
}

function startTimer() {
  startBtn.setAttribute('disabled', true);
  inputEl.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (secondsEl.textContent <= 0 && minutesEl.textContent <= 0) {
    Notify.success('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

function renderDate(formatDate) {
  secondsEl.textContent = formatDate.seconds;
  minutesEl.textContent = formatDate.minutes;
  hoursEl.textContent = formatDate.hours;
  daysEl.textContent = formatDate.days;
}
