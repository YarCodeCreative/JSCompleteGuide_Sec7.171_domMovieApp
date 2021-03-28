"use strict";
// DOM
const addMovieModalEl = document.getElementById('add-modal');
const deleteMovieModalEl = document.querySelector('#delete-modal');
const backdropEl = document.querySelector('#backdrop');
const addMovieModalUserInputs = document.querySelectorAll('input');
const entryTextSection  = document.querySelector('#entry-text');
const listRoot = document.getElementById('movie-list');

// Buttons
const startAddMovieBtn = document.querySelector('#start-add-movie-btn');
const addMovieCancelBtn = addMovieModalEl.querySelectorAll('button')[0];
const addMovieConfirmBtn  = addMovieModalEl.querySelectorAll('button')[1];
const deleteMovieCancelBtn = deleteMovieModalEl.querySelectorAll('button')[0];
const deleteMovieConfirmBtn = deleteMovieModalEl.querySelectorAll('button')[1];

//Global Variables
const movies = [];
let lastId = 1000;
let selectedMovieId;

// Expressions
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
      id : getId(),
      title : title, 
      imageUrl : imageUrl,
      rating : rating
    }
    movies.push(newMovie);
    console.log(movies);
    clearAddMovieModalUserInputs();
    closeModal();
    toggleBackdrop();
    renderNewMovieElement(newMovie);
    updateUI();
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
      <h2>${newMovie.title}</h2><br>
      <p>${newMovie.id}</p>
      <p>${newMovie.rating}/5</p>
    </div>`;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, newMovie.id));
  listRoot.appendChild(newMovieElement);
  // Sample img url: https://developer.mozilla.org/static/img/favicon144.png
};

const cancelAddMovieHandler = () => {
  closeModal();
  toggleBackdrop();
  clearAddMovieModalUserInputs();
};


const clearAddMovieModalUserInputs = () => {
  for (const userInput of addMovieModalUserInputs) {
    userInput.value = '';
  }
};

const deleteMovieHandler = (movieId) => {
selectedMovieId = movieId;
toggleModal(deleteMovieModalEl);
toggleBackdrop();
};


const deleteMovieConfirmBtnHandler = () => {
  let movieList = listRoot.children;
  let movieIndex = 0;
  for (const movie of movies) {
    if (selectedMovieId === movie.id) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  /* movieList[movieIndex].innerHTML = ''; */
  /* listRoot.removeChild(movieList[movieIndex]); */
  movieList[movieIndex].remove();
  closeModal();
  toggleBackdrop();
  updateUI();
  console.log(movies);
  console.log(movieList);
};

const deleteMovieCancelBtnHandler = () => {
  closeModal(); 
  toggleBackdrop();
}

// Services
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  }else {
    entryTextSection.style.display = 'none';
  }
};

const getId = () => {
  if (movies.length > 0) {
    lastId++;
  }
  return lastId;
}

const closeModal = () => {
  const modals = document.querySelectorAll('.modal');
  for (const el of modals) {
    if (el.classList.contains('visible')) {
      toggleModal(el);
    }
  }
};

const toggleModal = (modal) => {
  modal.classList.toggle('visible');
};

const toggleBackdrop = () => {
  backdropEl.classList.toggle('visible');
};

//Event Listeners
startAddMovieBtn.addEventListener('click', () => {
  toggleModal(addMovieModalEl); 
  toggleBackdrop();
});
backdropEl.addEventListener('click', () => {
  closeModal();
  toggleBackdrop();
});
addMovieCancelBtn.addEventListener('click', cancelAddMovieHandler);
addMovieConfirmBtn.addEventListener('click', addMovieHandler);
deleteMovieCancelBtn.addEventListener('click', deleteMovieCancelBtnHandler);
deleteMovieConfirmBtn.addEventListener('click', deleteMovieConfirmBtnHandler);
