import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const promiseValue = {
        position,
        delay,
      };
      if (shouldResolve) {
        // Fulfill
        resolve(promiseValue);
      } else {
        // Reject
        reject(promiseValue);
      }
    }, delay);
  });
}

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const delay = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
