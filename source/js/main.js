import './modules/search';
import './modules/swiper';
import './modules/contact';
import menu from './modules/menu';
import {removeFromCart} from './modules/removeFromCart';
import {changeValue} from './modules/swiper';

menu();

document.addEventListener('click', (e) => {
  const changeValueBtn = e.target.closest('.change-value-btn');
  const btnRemoveItem = e.target.closest('.order__item-remove');

  if (changeValueBtn) {
    changeValue(changeValueBtn);
  }

  if (btnRemoveItem) {
    removeFromCart(btnRemoveItem);
  }
});


/* Modernizr.on('webp', function(result) {
  if (result) {
    // supported
  } else {
    // not-supported
  }
});*/
