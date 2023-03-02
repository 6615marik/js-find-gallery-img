import { fetchImage } from './fetch';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const serchbtn = document.querySelector('.button');
const loardbtn = document.querySelector('.load-more');
form.addEventListener('submit', onFetchValue);
function onFetchValue(e) {
  e.preventDefault();
  const value = input.value;
  console.log(value);
  fetchImage(value)
    .then(value => console.log(value))
    .catch(error => console.log(error));
}
