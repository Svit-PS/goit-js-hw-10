import axios from 'axios';

const API_KEY =
  'live_j9hiYDaXBClpP0Zk5fJgUtzAy3yQwGZ1vMe77fYufxMp2tDaMbHqQ30nP6AnhDNM';
axios.defaults.headers.common['x-api-key'] =
  'live_j9hiYDaXBClpP0Zk5fJgUtzAy3yQwGZ1vMe77fYufxMp2tDaMbHqQ30nP6AnhDNM';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(err => console.log(err));
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
    //   api_key=${API_KEY}&
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(err => console.log(err));
}

export { fetchBreeds, fetchCatByBreed };
