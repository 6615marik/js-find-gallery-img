import { fetchImage } from './fetch';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
// const serchbtn = document.querySelector('.button');

const loardbtn = document.querySelector('.load-more');
// const { height: cardHeight } =
//   gallery.firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

loardbtn.classList.add('is-hidden');

let value = '';
let page = 1;
console.dir(value);
form.addEventListener('submit', onFetchValue);
function onFetchValue(e) {
  e.preventDefault();
  value = input.value;
  page = 1;
  fetchImg(value, page);
}

function fetchImg(value, page) {
  fetchImage(value, page)
    .then(value => {
      Notify.info(`Hooray! We found totalHits ${value.totalHits} images.`);
      onLookImg(value.hits);
      new SimpleLightbox('.gallery a').refresh();
    })
    .catch(error => console.log(error));
  loardbtn.classList.remove('is-hidden');
}
function onLookImg(galleryFetch) {
  console.log(galleryFetch);
  if (galleryFetch.length === +0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    const img = galleryFetch
      .map(
        img =>
          `<div class="photo-card">
          <a class="gallery-item" href="${img.largeImageURL}">
          <img
            class="gallery__image"
            src="${img.webformatURL}"
            alt="${img.tags}"
            loading="lazy"
        /></a>
    <div class="info">
      <p class="info-item">${img.likes}
        <b>Likes</b>
      </p>
      <p class="info-item">${img.views}
        <b>Views</b>
      </p>
      <p class="info-item">${img.comments}
        <b>Comments</b>
      </p>
      <p class="info-item">${img.downloads}
        <b>Downloads</b>
      </p>
    </div>
  </div>`
      )
      .join('');

    gallery.innerHTML = img;
  }
}
loardbtn.addEventListener('click', onLoardMore);

function onLoardMore() {
  value = input.value;
  page += 1;
  fetchImage(value, page)
    .then(value => {
      onLookImg(value.hits);
      new SimpleLightbox('.gallery a').refresh();
    })
    .catch(error => console.log(error));
}
