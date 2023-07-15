'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////////

const header = document.querySelector('.header');

// create and insert elements
const cookieNotice = document.createElement('div');
cookieNotice.classList.add('cookie-message');
cookieNotice.innerHTML =
  'This site uses cookies for improved perfomance and analytics.<button class="btn btn--close-cookie">Got it</button>';

header.prepend(cookieNotice);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => cookieNotice.remove());

// styles
cookieNotice.style.backgroundColor = '#37383d';
cookieNotice.style.width = '120%';
cookieNotice.style.height =
  Number.parseFloat(getComputedStyle(cookieNotice).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// // attributes
// const logo = document.querySelector('.nav__logo');
