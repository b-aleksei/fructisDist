import Swiper from 'swiper/bundle';
const fruitSwiper = new Swiper('.swiper-container', {
  loop: true,
  // spaceBetween: 100,

  navigation: {
    nextEl: '.btn-next',
    prevEl: '.btn-back',
  },
});

export const changeValue = (btn) => {
  const valueNode = document.querySelector('.fruits-slider__value');
  if (!valueNode) {
    return;
  }
  let value = +valueNode.textContent;
  if (btn.classList.contains('fruits-slider__dec')) {
    if (value > 1) {
      valueNode.textContent = --value + '';
    }
  }
  if (btn.classList.contains('fruits-slider__inc')) {
    valueNode.textContent = ++value + '';
  }
};

/* const btn = document.querySelector('.fruits-slider__cart');
btn.addEventListener('click', () => {
  console.log('slide', fruitSwiper.slides[fruitSwiper.activeIndex]);
});*/
/*
const value = document.querySelector('.fruits-slider__value');
value.addEventListener('input', (e) => {
  if (e.target.innerText.length > 3) {
    return;
  }
  e.target.innerText = e.target.innerText.replace(/\D/, '');
  if (e.target.innerText === '' || e.target.innerText === '0') {
    e.target.innerText = '1';
  }
  setCursor(e.target);
});
*/
