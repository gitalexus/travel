import Swiper from '../../vendor/swiper.js';

const heroSliderSelector = '[data-swiper="hero"]';

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

function initSlider(sliderSelector, sliderOptions) {
  const slider = document.querySelector(sliderSelector);

  if (slider) {
    return new Swiper(slider, sliderOptions);
  }

  return null;
}

function initSliders() {
  // DEBUG
  console.log('* инициируем слайдеры');
  initSlider(heroSliderSelector, heroSliderOptions);

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
  console.log('** слайдеры инициализированы');
}

export {initSliders};
