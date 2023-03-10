export function fetchImage(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const key = '32372176-cc8c36cdf5846484fc1786588';
  return fetch(
    `${BASE_URL}?q=${value}&image_type=photo&orientation=horizontal&safesearch=true&key=${key}&per_page=4&page=${page}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
