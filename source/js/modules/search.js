import MultiModal from './modal';

new MultiModal({
  beforeOpen(obj) {
    if (obj.currentWindow.modal.id === 'search-modal') {
      document.body.classList.add('search-menu-active');
    }
  },

  beforeClose(obj) {
    if (obj.currentWindow.modal.id === 'search-modal') {
      document.body.classList.remove('search-menu-active');
    }
  },
});
