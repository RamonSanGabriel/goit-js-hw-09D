// Described in documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const date = new Date();
// const textInput = document.querySelector('input[type="text"]');
// const dateTimePicker = document.querySelector('input#datetime-picker');
// const btn = document.querySelector('button[data-start]');
// const days = document.querySelector('span[data-days]');
// const hours = document.querySelector('span[data-hours]');
// const minutes = document.querySelector('span[data-minutes]');
// const seconds = document.querySelector('span[data-seconds]');
// let ms = dateTimePicker;

const refs = {
  datetimePicker: document.querySelector('input#datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
refs.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startTime = Date.now();

    if (selectedDate < startTime) {
      Notify.failure('Please choose a date in the future');
      btn.disabled = true;
      return;
    }
    refs.btn.disabled = false;
    let intervalId = null;

    refs.btn.addEventListener('click', startCountdown);

    function startCountdown() {
      refs.btn.disabled = true;
      refs.datetimePicker.disabled = true;

      intervalId = setInterval(() => {
        const currentTime = Date.now();

        if (selectedDate < currentTime) {
          clearInterval(intervalId);
          refs.datetimePicker.disabled = false;
          return;
        }

        const timeDifference = selectedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        days.textContent = addLeadingZero(days);
        hours.textContent = addLeadingZero(hours);
        minutes.textContent = addLeadingZero(minutes);
        seconds.textContent = addLeadingZero(seconds);
      });
    }
  },
};
flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0'); //01
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
