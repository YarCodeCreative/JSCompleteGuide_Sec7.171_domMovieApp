'use strict';
// DOM
const addMovieModalEl = document.getElementById('add-modal');
const backdropEl = document.querySelector('#backdrop');
const addMovieModalUserInputs = document.querySelectorAll('input');
const entryTextSection  = document.querySelector('#entry-text');

const startAddMovieBtn = document.querySelector('#start-add-movie-btn');
const addMovieCancelBtn = addMovieModalEl.querySelectorAll('button')[0];
const addMovieAddBtn  = addMovieModalEl.querySelectorAll('button')[1];

//Global Variables
const movies = [];

// Expressions
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  }else {
    entryTextSection.style.display = 'none';
  }
};

const renderNewMovieElement = (newMovie) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = 
    `<div class = "movie-element_image">
      <img src="${newMovie.imageUrl}" alt="${newMovie.title}">
    </div>
    <div class="movie-element_info">
      <h2>${newMovie.title}</h2>
      <p>${newMovie.rating}/5</p>
    </div>`;
  const listRoot = document.getElementById('movie-list');
  listRoot.appendChild(newMovieElement);
  // Sample img url: https://developer.mozilla.org/static/img/favicon144.png
};

const toggleBackdrop = () => {
  backdropEl.classList.toggle('visible');
};

const toggleMovieModal = () => {
  addMovieModalEl.classList.toggle('visible');
  toggleBackdrop();
};

const backdropElClickHandler = () => {
  toggleMovieModal();
};

const clearAddMovieModalUserInputs = () => {
  for (const userInput of addMovieModalUserInputs) {
    userInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
  clearAddMovieModalUserInputs();
};

const addMovieHandler = () => {
  const title = addMovieModalUserInputs[0].value;
  const imageUrl = addMovieModalUserInputs[1].value;
  const rating = addMovieModalUserInputs[2].value;
  let newMovie = {};
  
  if (
    title.trim() === '' || 
    imageUrl.trim() === '' || 
    rating.trim() === '' ||
    +rating < 1 ||               // The `+` converts the operand to number type
    +rating > 5)
    {
      alert('Please enter valid value');
  } else {
    newMovie = {
      title : title, 
      imageUrl : imageUrl,
      rating : rating
    }
    movies.push(newMovie);
    console.log(movies);
    clearAddMovieModalUserInputs();
    toggleMovieModal();
    renderNewMovieElement(newMovie);
    updateUI();
  }
}



//Event Listeners
startAddMovieBtn.addEventListener('click', toggleMovieModal);
backdropEl.addEventListener('click', backdropElClickHandler);
addMovieCancelBtn.addEventListener('click', cancelAddMovieHandler);
addMovieAddBtn.addEventListener('click', addMovieHandler);