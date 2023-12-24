const burger = document.querySelector('[data-burger]');

function initBurger() {
  const header = document.querySelector('.header');
  const navigation = document.querySelector('.navigation');
  burger.addEventListener('click', () => {
    if (!header.classList.contains('.burger-is-active')) {
      navigation.classList.remove('is-hidden');
    }
    // если бургер активен, то скрываем меню через 300мс, что бы не оставалось артефактов при изменении размеров окна
    if (header.classList.contains('burger-is-active')) {
      setTimeout(() => {
        navigation.classList.add('is-hidden');
      }, 300);
    }
    header.classList.toggle('burger-is-active');
  });
}

export {initBurger};
