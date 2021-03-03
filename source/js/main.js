import menu from './modules/menu';
import './modules/search';
import './modules/swiper';
import {changeValue} from './modules/swiper';

menu();

document.addEventListener('click', (e) => {
  const changeValueBtn = e.target.closest('.change-value-btn');

  if (changeValueBtn) {
    changeValue(changeValueBtn);
  }
});


/* Modernizr.on('webp', function(result) {
  if (result) {
    // supported
  } else {
    // not-supported
  }
});*/
