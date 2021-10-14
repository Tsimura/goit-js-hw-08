import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input[type = "email"]'),
  messageEl: document.querySelector('textarea[name = "message"]'),
};

function onFormSubmit(e) {
  e.preventDefault();
  if (formData.email == '' || formData.message == '') {
    alert('Всі поля повинні бути заповнені!');
  } else {
    console.log('Ви успішно відправили форму!', formData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

const formData = {
  email: '',
  message: '',
};

refs.formEl.addEventListener('input', e => {
  // console.log('e.target.name:', e.target.name);
  // console.log('e.target.value:', e.target.value);
  //console.log(formData);
  formData[e.target.name] = e.target.value;
  // console.log(formData);
});
refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onTextareaInput, 500));
popularTextarea();

function onTextareaInput(e) {
  let message = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, message);
}

function popularTextarea() {
  let parsedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (parsedMessage) {
    formData.message = parsedMessage.message;
    formData.email = parsedMessage.email;

    refs.messageEl.value = parsedMessage.message;
    refs.emailEl.value = parsedMessage.email;
  }
}
