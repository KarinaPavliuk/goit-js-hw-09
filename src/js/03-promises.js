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
  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);

  console.log('delay', delay);
  console.log('step', step);
  console.log('amount', amount);

  if (step < '0' || delay < '0' || amount < '0') {
    return Notify.failure(`❌ Value must be >= zero`);
  }

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
