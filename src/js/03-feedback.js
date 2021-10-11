import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const formData = {};
const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input[type = "email"]'),
  messageEl: document.querySelector('textarea[name = "message"]'),
  btnEl: document.querySelector('button[type = "submit"]'),
};
refs.formEl.addEventListener('input', e => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  formData[e.target.name] = e.target.value;
  console.log(formData);
});

popularTextarea();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.messageEl.addEventListener('input', throttle(onTextareainput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  console.log('Відправили форму!');
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareainput(e) {
  const message = e.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function popularTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    console.log(savedMessage);
    refs.messageEl.value = savedMessage;
  }
}

// https://youtu.be/Fh8d14cY9AM?t=2636
// localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: 'Mango', message: 'qwerty' }));

// const savedData = localStorage.getItem(STORAGE_KEY);
// console.log(savedData);
// const parseddata = JSON.parse(savedData);
// console.log(parseddata);
