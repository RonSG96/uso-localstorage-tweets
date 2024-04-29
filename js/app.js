/**
 * Variables
 */
const formulario = document.querySelector('#formulario');
const listaTweeks = document.querySelector('#lista-tweets');
const textAreaTweet = document.querySelector('#tweet');

//inicio de arreglo de tweets
let tweets = [];

/**
 * Funciones
 */

const agregarTweet = (e) => {
  e.preventDefault();

  const tweet = textAreaTweet.value;

  //validacion
  if (tweet === '') {
    mostrarError('Un mensaje no puede ir vacio');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //añadir al arreglo de tweets

  tweets = [...tweets, tweetObj];

  //crear html

  crearHTML();

  //reiniciar el formulario
  formulario.reset();
};

const mostrarError = (mensajeError) => {
  const error = document.createElement('p');
  error.textContent = mensajeError;
  error.classList.add('error');

  const contenido = document.querySelector('#contenido');
  contenido.appendChild(error);

  setTimeout(() => {
    error.remove();
  }, 3000);
};

const crearHTML = () => {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar boton de eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'X';

      //agrengado funcionalidad al boton X
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      //Agregar los tweets en el html
      const li = document.createElement('li');
      li.textContent = tweet.tweet;
      //Asignar el boton
      li.appendChild(btnEliminar);
      listaTweeks.appendChild(li);
    });
  }

  sincronizarStorage();
};

//Agregar los tweets en local storage

const sincronizarStorage = () => {
  localStorage.setItem('tweets', JSON.stringify(tweets));
};

const borrarTweet = (id) => {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
};
const limpiarHTML = () => {
  while (listaTweeks.firstChild) {
    listaTweeks.removeChild(listaTweeks.firstChild);
  }
};

/**
 * Eventos
 */
const eventListeners = () => {
  //cuando el usuario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweet);

  //cuando el documento este cargado en su totalidad
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    console.log(tweets);
    crearHTML();
  });
};

eventListeners();
