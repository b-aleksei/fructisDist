export default class MultiModal {
  constructor(props) {
    const defaultConfig = {
      openBtnAttribute: 'data-modal-open',
      closeBtnAttribute: 'data-modal-close',
      closeOnOverlay: true,
      multiple: false,
      beforeOpen() {
      },
      beforeClose() {
      },
    };
    this.config = Object.assign(defaultConfig, props);
    this.init();
  }

static overlay = false;

init() {
  this.openedWindows = [];
  this.currentWindow = null;
  this.reopen = false;
  this.frozen = false; // отменить обработчки событий
  this.scrollPosition = 0;
  this._focusableEls = 'a[href]:not(:disabled), input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), button:not(:disabled), [contenteditable], [tabindex]:not([tabindex^="-"])';

  if (!MultiModal.overlay) {
    MultiModal.overlay = document.createElement('div');
    MultiModal.overlay.classList.add('modal-overlay');
    document.body.append(MultiModal.overlay);
  }
  this.eventsFeeler();
}

eventsFeeler() {
  document.addEventListener('click', e => {
	  if (this.frozen) return;
    const opener = e.target.closest('[' + this.config.openBtnAttribute + ']');
    if (opener) {
      e.preventDefault();
      const modalId = opener.getAttribute(this.config.openBtnAttribute);
      const modal = document.getElementById(modalId);
      this.open(modal, this.config.multiple, opener);
    } else if (e.target.closest('[' + this.config.closeBtnAttribute + ']')) {
      this.close();
    } else if (this.config.closeOnOverlay && this.openedWindows.length) {
      if (!e.target.closest('.modal__wrap')) {
        this.close();
      }
    }
  });

  document.addEventListener('keydown', e => {
    if (this.frozen) return;
    if ((e.key === 'Escape' || e.key === 'Esc') && this.openedWindows.length) {
      e.preventDefault();
      this.close();
      return;
    }
    if (e.key === 'Tab' && this.openedWindows.length) {
      this.focusCatcher(e);
    }
  });
}

open(selector, multiple, opener) {
  if (this.openedWindows.length && !multiple) {
    this.reopen = true;
    this.close(selector, multiple, opener);
    return;
  }

  let modal = null;
  if (selector) {
    modal = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }
  if (!selector || !(modal instanceof HTMLElement)) {
    this.removeOverlay();
    return;
  }

  this.currentWindow = {};
  this.currentWindow.modal = modal;
  this.currentWindow.focusableElements = this.currentWindow.modal.querySelectorAll(this._focusableEls);
  if (opener instanceof HTMLElement) {
    this.currentWindow.starter = opener;
    this.currentWindow.starter.setAttribute('aria-expanded', 'true');
  } else {
    this.currentWindow.starter = document.activeElement;
  }
  this.config.beforeOpen(this);

  if (!this.openedWindows.length) {
    this.bodyScrollControl(true);
    MultiModal.overlay.classList.add('modal-overlay--show');
  }

  const setFocus =() => {
    if (this.currentWindow.focusableElements.length) {
      this.currentWindow.focusableElements[0].focus();
    }
    this.currentWindow.modal.removeEventListener('transitionend', setFocus);
  };

  this.currentWindow.modal.addEventListener('transitionend', setFocus);
  this.currentWindow.modal.setAttribute('aria-hidden', 'false');
  this.currentWindow.modal.classList.add('modal--active');
  const activeClass = this.currentWindow.modal.dataset.activeClass;
  if (activeClass) {
    document.body.classList.add(activeClass);
    this.currentWindow.activeClass = activeClass;
  }
  this.openedWindows.push(this.currentWindow);
}

close(selector, multiple, opener) {
  if (!this.openedWindows.length) {
    return;
  }
  this.config.beforeClose(this);
  const currentWindow = this.openedWindows[this.openedWindows.length - 1];
  currentWindow.modal.classList.remove('modal--active');
  currentWindow.modal.setAttribute('aria-hidden', 'true');
  currentWindow.starter.setAttribute('aria-expanded', 'false');
  currentWindow.starter.focus();
  if (currentWindow.activeClass) {
    document.body.classList.remove(currentWindow.activeClass);
  }

  this.openedWindows.pop();
  if (this.openedWindows.length) {
    this.currentWindow = this.openedWindows[this.openedWindows.length - 1]; // для фокускэтчера на предыдущей модалке
    return;
  }

  if (this.reopen) {
    this.previousStarter = currentWindow.starter;
	  this.reopen = false;
	  const modalOpen = () => {
      this.open(selector, multiple, opener);
      currentWindow.modal.removeEventListener('transitionend', modalOpen);
	  };
    currentWindow.modal.addEventListener('transitionend', modalOpen);
	  return;
  }

  this.removeOverlay();

  if (this.previousStarter) {
    this.previousStarter.focus();
  }
}

removeOverlay() {
  this.bodyScrollControl();
  MultiModal.overlay.classList.remove('modal-overlay--show');
}

focusCatcher(e) {
  const firstFocusableEl = this.currentWindow.focusableElements[0];
  const lastFocusableEl = this.currentWindow.focusableElements[this.currentWindow.focusableElements.length - 1];

  if (e.shiftKey) { // shift + tab
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus();
      e.preventDefault();
    }
  } else { // tab
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      e.preventDefault();
    }
  }
}

bodyScrollControl(open) {
  const html = document.documentElement;
  if (open) {
    this.scrollPosition = self.pageYOffset;
    html.style.top = -this.scrollPosition + 'px';
    html.classList.add('scroll-lock');
  } else {
    html.classList.remove('scroll-lock');
    self.scrollTo(0, this.scrollPosition);
    html.style.top = '';
  }
}
}
