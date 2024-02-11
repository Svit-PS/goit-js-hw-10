import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  breed: document.querySelector('.breed-select'),
  cardCat: document.querySelector('.js-cardCat'),
  loader: document.querySelector('.loader-block'),
  //   error: document.querySelector('.error'),
};

refs.breed.addEventListener('change', onChangeBreed);

fetchBreeds()
  .then(breeds => {
    createBreedsSelect(breeds);
    refs.breed.classList.remove('is-hidden');
  })
  .catch(err => {
    // refs.error.classList.remove('is-hidden');
    console.log(err);
    Notiflix.Notify.init({
      fontSize: '15px',
    });
    Notiflix.Report.info(
      'Oops!',
      'Something went wrong! Try reloading the page',
      'Sorry',
      {
        width: '360px',
        svgSize: '100px',
      }
    );
  })
  .finally(() => refs.loader.classList.add('is-hidden'));

function createBreedsSelect(arr) {
  const arrBreeds = [];
  arr.map(({ id, name }) => {
    arrBreeds.push({ id, name });
  });
  arrBreeds.map(({ id, name }) => {
    const option = document.createElement('option');
    option.value = id;
    option.text = name;
    refs.breed.append(option);
  });
  new SlimSelect({
    select: '#selectElement',
  });
}

function onChangeBreed(event) {
  //   refs.error.classList.add('is-hidden');
  refs.cardCat.classList.add('is-hidden');
  refs.loader.classList.remove('is-hidden');
  refs.cardCat.innerHTML = '';
  const idBreed = event.target.value;
  fetchCatByBreed(idBreed)
    .then(cards => {
      const { url } = cards[0];
      const { name, temperament, description } = cards[0].breeds[0];
      createBoxCat(name, temperament, description, url);
      refs.cardCat.classList.remove('is-hidden');
    })
    .catch(err => {
      //refs.error.classList.remove('is-hidden');
      console.log(err);
      Notiflix.Notify.init({
        fontSize: '15px',
      });
      Notiflix.Report.info(
        'Oops!',
        'Something went wrong! Try reloading the page',
        'Sorry',
        {
          width: '360px',
          svgSize: '100px',
        }
      );
    })
    .finally(() => refs.loader.classList.add('is-hidden'));
}

function createBoxCat(name, temperament, description, url) {
  const textMarking = `<div>
      <img class = "imgCat" src="${url}" alt="${name}" width="300">
    </div>
    <div>
    <h2>
        ${name}
      </h2>
      <p>
        ${description}
      </p>
      <p><b>Temperament: </b>${temperament}</p>
    </div>`;
  refs.cardCat.innerHTML = textMarking;
}
