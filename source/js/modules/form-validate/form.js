import {Validator} from './validator';
import {callbacks} from './callback';
import {initPhoneInput} from './init-phone-input';

export class Form {
  constructor() {
    this._validator = new Validator();
    this._initPhoneInput = initPhoneInput;
    this._callbacks = callbacks;
  }

  _resetSelect(select) {
    const nativeSelect = select.querySelector('select');
    const activeIndex = nativeSelect.options.selectedIndex;
    const selectedOption = nativeSelect.options[activeIndex];
    const buttonText = select.querySelector('.custom-select__text');
    const selectItems = select.querySelectorAll('.custom-select__item');
    buttonText.textContent = selectedOption.textContent;
    selectItems.forEach((item, index) => {
      if (index === activeIndex - 1) {
        item.setAttribute('aria-selected', 'true');
        return;
      }
      item.setAttribute('aria-selected', 'false');
    });
    if (!nativeSelect.value) {
      select.classList.remove('not-empty');
      select.classList.remove('is-valid');
    }
  }

  _resetSelects(form) {
    const selects = form.querySelectorAll('[data-select]');
    selects.forEach((select) => {
      this._resetSelect(select);
    });
  }

  reset(form) {
    form.reset();
    form.querySelectorAll('.is-invalid').forEach((item) => item.classList.remove('is-invalid'));
    form.querySelectorAll('.is-valid').forEach((item) => item.classList.remove('is-valid'));
    form.querySelectorAll('.input-message').forEach((item) => item.remove());
    setTimeout(() => {
      this._resetSelects(form);
    });
  }

  initPhoneInput(parent) {
    this._initPhoneInput(parent);
  }

  validateForm(form) {
    return this._validator.validateForm(form);
  }

  validateFormElement(item) {
    return this._validator.validateFormElement(item);
  }

  _onFormSubmit(event, callback = null) {
    const inputs = event.target.querySelectorAll('input')
    if (inputs[1].value && inputs[1].getAttribute('aria-invalid')) {
      inputs[1].setCustomValidity('Необходимо ввести email включая коневой домен');
      inputs[1].reportValidity();
    }
    if (inputs[0].value && inputs[0].getAttribute('aria-invalid')) {
      inputs[0].setCustomValidity('Необходимо заполнить телефон введя 10 цифр');
      inputs[0].reportValidity();
      inputs[0].setCustomValidity('');
    }
    if (!inputs[0].value && !inputs[1].value) {
      inputs[0].setCustomValidity('Необходимо заполнить хотя бы одно из полей');
      inputs[0].reportValidity();

    } else {
      if (this.validateForm(event.target) && callback) {
        this._callbacks[callback].successCallback(event);
        if (this._callbacks[callback].reset) {
          setTimeout(() => {
            this.reset(event.target);
          }, this._callbacks[callback].resetTimeout ? this._callbacks[callback].resetTimeout : 500);
        }
        return;
      }
    }
    if (!this.validateForm(event.target) && callback) {

      this._callbacks[callback].errorCallback(event);
      return;
    }
  }

  _onFormInput(item) {
    this.validateFormElement(item);
  }

  _initValidate(parent) {
    const form = parent.querySelector('form');
    if (!form) {
      return;
    }

    const phoneParents = form.querySelectorAll('[data-validate-type="phone"]');
    phoneParents.forEach((item) => this._initPhoneInput(item));

    const callback = parent.dataset.callback;
    form.noValidate = true;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._onFormSubmit(event, callback);
    });

    form.addEventListener('input', (event) => {
      this._onFormInput(event.target);
    });

    form.addEventListener('reset', (event) => {
      this.reset(event.target);
    });
  }

  init() {
    this._validateParent = document.querySelectorAll('[data-form-validate]');
    if (!this._validateParent.length) {
      return;
    }
    this._validateParent.forEach((parent) => this._initValidate(parent));
  }
}
