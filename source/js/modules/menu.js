export default () => {
  const navButton = document.querySelector('.nav__toggle');
  const invertExpanded = (el) => el.getAttribute('aria-expanded') === 'false' ? 'true' : 'false';
  if (!navButton) {
    return;
  }

  const showMenu = ({target}) => {
    target.setAttribute('aria-expanded', invertExpanded(target));
    document.body.classList.toggle('nav-menu-active');
  };

  const resolveStatus = (value, maxValue) => {
    return Math.abs(value) > maxValue / 3;
  };

  const swipeMenu = (evt) => {
    // const y = evt.changedTouches[0].clientY;
    const parent = evt.target.parentElement;
    let shift = 0;
    let minEdge = 0;
    if (document.body.classList.contains('nav-menu-active')) {
      minEdge = parent.offsetHeight;
    }
    const maxEdge = parent.offsetHeight;
    const touchY = evt.changedTouches[0].clientY;
    // const rightEdge = range.offsetWidth - evt.target.offsetWidth;
    // const topEdge

    const onMove = (e) => {
      const y = e.changedTouches[0].clientY;
      shift = y - touchY;
      if (shift < -maxEdge) {
        shift = -maxEdge;
      }
      if (shift > minEdge) {
        shift = minEdge;
      }
      console.log('shift: ', shift);
      parent.style.transform = `translate3d(-50%, ${shift}px, 0)`;
    };

    const onTouchUp = () => {
      parent.style.transform = '';
      console.log(resolveStatus(shift, maxEdge), 'resolveStatus');
      if (resolveStatus(shift, maxEdge)) {
        document.body.classList.toggle('nav-menu-active');
      }
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onTouchUp);
    };

    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onTouchUp);
  };

  navButton.addEventListener('click', showMenu);
  navButton.addEventListener('touchstart', swipeMenu);
};


