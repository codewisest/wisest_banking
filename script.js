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

// scroll to view
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// cookie notice
const header = document.querySelector('.header');

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

// Page navigation
document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    e.preventDefault();
  });
});
//////////////////////////////////////////////////////////////////////////////////

// create and insert elements

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   // const s1coords = section1.getBoundingClientRect();
//   // scroll to
//   // window.scrollTo({
//   //   left: s1coords.left + scrollX,
//   //   top: s1coords.top + scrollY,
//   //   behaviour: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// EVENT PROPAGATION
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
//   console.log('Link: ', e.target, e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
//   console.log('Container: ', e.target, e.currentTarget);
// });

// document.querySelector('nav').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
//   console.log('Nav: ', e.target, e.currentTarget);
// });
