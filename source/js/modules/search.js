import MultiModal from './modal';

const modalObj = new MultiModal();

const btnSearch = document.querySelector('.nav__link-search');

if (btnSearch) {
  btnSearch.addEventListener('click', () => {
    if (!document.body.classList.contains('search-menu-active')) {
      setTimeout(() => {
        modalObj.open('#search-modal');
      });
    } else {
      modalObj.close();
    }
  });
}
