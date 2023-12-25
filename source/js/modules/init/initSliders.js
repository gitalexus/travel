import Swiper from '../../vendor/swiper.js';

const heroSliderSelector = '[data-swiper="hero"]';
const toursSliderSelector = '[data-swiper="tours"]';

const heroSliderOptions = {
  loop: true,
  speed: 1000,
  grabCursor: true,

  pagination: {
    el: '[data-swiper-pagination="hero"]',
    type: 'bullets',
    clickable: true,
  },
};

const toursSliderOptions = {
  navigation: {
    nextEl: '[data-button="tours-next"]',
    prevEl: '[data-button="tours-prev"]',
  },
  speed: 500,
  grabCursor: true,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
};

function initSlider(sliderSelector, sliderOptions) {
  const slider = document.querySelector(sliderSelector);
  if (slider) {
    return new Swiper(slider, sliderOptions);
  }
  return null;
}

function initSliders() {
  initSlider(heroSliderSelector, heroSliderOptions);
  initSlider(toursSliderSelector, toursSliderOptions);

  // добавляется возможность фокуса на слайды
  const slides = document.querySelectorAll('[data-slide="slide"]');
  slides.forEach((slide) => {
    slide.setAttribute('tabindex', '0');
  });
  // убирается возможность фокуса с дубликатов слайдов автоматически создаваемых swiper
  const duplicates = document.querySelectorAll('.swiper-slide-duplicate');
  duplicates.forEach((duplicate) => {
    duplicate.setAttribute('tabindex', '-1');
  });
}

export {initSliders};
