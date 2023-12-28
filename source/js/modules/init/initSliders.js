import Swiper from '../../vendor/swiper.js';

const heroSliderSelector = '[data-swiper="hero"]';
const toursSliderSelector = '[data-swiper="tours"]';
const trainingSliderSelector = '[data-swiper="training"]';
const reviewsSliderSelector = '[data-swiper="reviews"]';
const advantagesSliderSelector = '[data-swiper="advantages"]';
const gallerySliderSelector = '[data-swiper="gallery"]';

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
  initialSlide: 1,

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

const trainingSliderOptions = {
  navigation: {
    nextEl: '[data-button="training-next"]',
    prevEl: '[data-button="training-prev"]',
  },

  speed: 500,
  grabCursor: true,
  initialSlide: 1,
  autoHeight: true,

  breakpoints: {
    0: {
      slidesPerView: 1,
      autoHeight: false,
    },
    430: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    580: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
      autoHeight: true,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};

const reviewsSliderOptions = {
  navigation: {
    nextEl: '[data-button="reviews-next"]',
    prevEl: '[data-button="reviews-prev"]',
  },

  speed: 500,
  grabCursor: true,
  initialSlide: 0,
  loop: true,

  breakpoints: {
    0: {
      slidesPerView: 'auto',
    },
    350: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 120,
    },
  },
};

const advantagesSliderOptions = {
  navigation: {
    nextEl: '[data-button="advantages-next"]',
    prevEl: '[data-button="advantages-prev"]',
  },

  speed: 500,
  grabCursor: true,
  initialSlide: 2,
  centeredSlides: true,
  loop: true,
  // spaceBetween: 30,

  breakpoints: {
    0: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
  },
};

const gallerySliderOptions = {
  navigation: {
    nextEl: '[data-button="gallery-next"]',
    prevEl: '[data-button="gallery-prev"]',
  },

  slidesPerView: 'auto',
  speed: 500,
  grabCursor: true,
  loop: true,
  spaceBetween: 5,
  initialSlide: 6,
  slidesPerGroup: 2,

  breakpoints: {
    0: {
      spaceBetween: 3,
    },
    768: {
      spaceBetween: 5,
    },
    1024: {
      spaceBetween: 5,
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

function initAdvantagesSlider(advantagesSelector, advantagesOptions) {
  if (advantagesSelector) {
    let slider;
    const tablet = window.matchMedia('(max-width: 1024px)');

    if (!tablet.matches) {
      slider = initSlider(advantagesSelector, advantagesOptions);
    }

    window.addEventListener('resize', () => {
      if (tablet.matches && slider) {
        slider.destroy();
        slider = null;
      } else if (!tablet.matches && !slider) {
        slider = initSlider(advantagesSelector, advantagesOptions);
      }
    });
  }
}

function initSliders() {
  initSlider(heroSliderSelector, heroSliderOptions);
  initSlider(toursSliderSelector, toursSliderOptions);
  initSlider(trainingSliderSelector, trainingSliderOptions);
  initSlider(reviewsSliderSelector, reviewsSliderOptions);
  initAdvantagesSlider(advantagesSliderSelector, advantagesSliderOptions);
  initSlider(gallerySliderSelector, gallerySliderOptions);

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
