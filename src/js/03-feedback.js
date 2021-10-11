import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const formData = {};
const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input[type = "email"]'),
  messageEl: document.querySelector('textarea[name = "message"]'),
  //   btnEl: document.querySelector('button[type = "submit"]'),
};

refs.formEl.addEventListener('input', e => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  formData[e.target.name] = e.target.value;
  //   console.log(formData);
});

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onTextareaInput, 500));

popularTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log('Ви успішно відправили форму!');
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  const message = JSON.stringify(formData);
  //   console.log(message);
  localStorage.setItem(STORAGE_KEY, message);
}

function popularTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (parsedMessage) {
    // console.log('parsedMessage:', parsedMessage);
    refs.messageEl.value = parsedMessage.message;
    refs.emailEl.value = parsedMessage.email;
  }
}
