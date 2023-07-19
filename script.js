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
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     e.preventDefault();
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  if (e.target.closest('.operations__tab')) {
    const dataID = e.target
      .closest('.operations__tab')
      .getAttribute('data-tab');

    tabs.forEach(tab => {
      tab.classList.remove('operations__tab--active');

      if (tab.classList.contains(`operations__tab--${dataID}`)) {
        tab.classList.add('operations__tab--active');
      }
    });

    tabsContent.forEach(function (tabContent) {
      tabContent.classList.remove('operations__content--active');
      if (tabContent.classList.contains(`operations__content--${dataID}`)) {
        tabContent.classList.add('operations__content--active');
      }
    });
  }
});

// menu fade animation
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    document.querySelectorAll('.nav__item').forEach(oneLink => {
      oneLink.style.opacity = '0.5';
      e.target.closest('.nav__item').style.opacity = '1';
    });
  }
});

navLinks.addEventListener('mouseout', function (e) {
  document.querySelectorAll('.nav__item').forEach(oneLink => {
    oneLink.style.opacity = '1';
  });
});

// sticky navigation: scroll event
// const nav = document.querySelector('.nav');
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(initialCoords.top);
//   if (this.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// sticky navigation: intersection observer API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);
const nav = document.querySelector('.nav');
const navigationHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navigationHeight}px`,
});
headerObserver.observe(header);

// reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// lazy loading image
const imgLazy = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgLazy.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

// next slide
let currentSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function () {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }

  goToSlide();
};

const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide();
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);
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

// const h1 = document.querySelector('h1');

// // going downwards: child
// console.log(h1.querySelectorAll('.highlight'));

// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.firstChild);
// h1.firstElementChild.style.color = 'purple';

// // going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// console.log(h1.closest('.header'));
// h1.closest('.header').style.backgroundColor = 'orangered';

// // going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });
