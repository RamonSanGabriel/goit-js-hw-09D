// Described in documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

const date = new Date();
const textInput = document.querySelector('input[type="text"]');
const datePicker = document.getElementById('input#date-picker');
const btn = document.querySelector('[data-start]');
// const days = document.querySelector('[data-days]');
// const hours = document.querySelector('[data-hours]');
// const minutes = document.querySelector('[data-minutes]');
// const seconds = document.querySelector('[data-seconds]');
let ms = datePicker;
btn.disabled = true;

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// console.log(Input);
// console.log(date); // Mon Feb 07 20
