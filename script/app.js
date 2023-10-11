const jokeContent = document.querySelector('.js-joke');
const jokeBtn = document.querySelector('.js-random-joke');
const jokeLoader = document.querySelector('.js-loading-state');
let loadingDelayed;

const showLoader = function () {
  loadingDelayed = setTimeout(() => {
    jokeLoader.classList.remove('u-hidden');
  }, 500);
  jokeContent.classList.add('u-hidden');
};

const removeLoader = function () {
  if (loadingDelayed) {
    clearTimeout(loadingDelayed);
    loadingDelayed = null;
  }

  jokeLoader.classList.add('u-hidden');
  jokeContent.classList.remove('u-hidden');
};

const fetchJoke = function () {
  return fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching joke:', error);
    });
};

const generateJoke = async () => {
  showLoader();
  const { joke } = await fetchJoke();
  jokeContent.innerHTML = joke;
  removeLoader();
};

const init = function () {
  console.log('script loaded');
  generateJoke();
  jokeBtn.addEventListener('click', generateJoke);
};

init();
