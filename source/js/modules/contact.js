import Swiper from 'swiper/bundle';
const galleryThumbs = new Swiper('.contact__wrap-slider-bottom', {
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  slidesPerView: 'auto',
});

const swiper = new Swiper('.contact__wrap-slider-top', {
  thumbs: {
    swiper: galleryThumbs,
  },
  grabCursor: true,
});

