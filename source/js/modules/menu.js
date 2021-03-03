export default () => {
  const navButton = document.querySelector('.nav__toggle');
  const invertExpanded = (el) => el.getAttribute('aria-expanded') === 'false' ? 'true' : 'false';
  if (!navButton) {
    return;
  }

  const perсentForSwipe = 0.1; // процент перетаскивания чтобы сработал доезд окна
  let isSwipingMenu = false; // на данный момент меню перетаскивается?
  let isTouchEvent = false;
  let touch = 'pointerdown';
  let touchMove = 'pointermove';
  let touchUp = 'pointerup';
  if ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch) {
    isTouchEvent = true;
    touch = 'touchstart';
    touchMove = 'touchmove';
    touchUp = 'touchend';
  }

  const showMenu = ({target}) => {
    if (isSwipingMenu) {
      return;
    }
    target.setAttribute('aria-expanded', invertExpanded(target));
    document.body.classList.toggle('nav-menu-active');
  };

  const resolveForSwipe = (value, maxValue, isMenuOpen) => {
    if (isMenuOpen) {
      return Math.abs(value) < maxValue * (1 - perсentForSwipe);
    } else {
      return Math.abs(value) > maxValue * perсentForSwipe;
    }
  };

  const swipeMenu = (evt) => {
    const parent = evt.target.parentElement;
    let isMenuOpen = false;
    let initialPosition = 0;
    let shift = 0;
    const minEdge = 0;
    const maxEdge = parent.offsetHeight;
    if (document.body.classList.contains('nav-menu-active')) {
      isMenuOpen = true;
      shift = initialPosition = maxEdge;
    }
    const touchY = (isTouchEvent) ? evt.changedTouches[0].clientY : evt.clientY;

    const onMove = (e) => {
      isSwipingMenu = true;
      const y = (isTouchEvent) ? e.changedTouches[0].clientY : e.clientY;
      shift = touchY - y + initialPosition;
      if (shift > maxEdge) {
        shift = maxEdge;
      }
      if (shift < minEdge) {
        shift = minEdge;
      }
      parent.style.cssText = `transform: translate3d(-50%, ${-shift}px, 0); transition: none`;
    };

    const onTouchUp = () => {
      setTimeout(() => { // чтобы событие отработало после других обработчиков
        isSwipingMenu = false;
      });
      parent.style.cssText = '';
      if (resolveForSwipe(shift, maxEdge, isMenuOpen)) {
        document.body.classList.toggle('nav-menu-active');
      }
      document.removeEventListener(touchMove, onMove);
      document.removeEventListener(touchUp, onTouchUp);
    };

    document.addEventListener(touchMove, onMove);
    document.addEventListener(touchUp, onTouchUp);
  };

  navButton.addEventListener('click', showMenu);
  navButton.addEventListener(touch, swipeMenu);
};


