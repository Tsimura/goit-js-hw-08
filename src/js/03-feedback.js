import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  // email: '',
  // message: '',
};

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input[type = "email"]'),
  messageEl: document.querySelector('textarea[name = "message"]'),
  //   btnEl: document.querySelector('button[type = "submit"]'),
};

refs.formEl.addEventListener('input', e => {
  // console.log('e.target.name:', e.target.name);
  // console.log('e.target.value:', e.target.value);
  formData[e.target.name] = e.target.value;
  // console.log(formData);
});

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onTextareaInput, 500));

popularTextarea();

// відправка форми
function onFormSubmit(e) {
  e.preventDefault();
  console.log('Ви успішно відправили форму!', formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// https://www.youtube.com/watch?v=Fh8d14cY9AM&t=177s&ab_channel=GoITFrontend

function onTextareaInput(e) {
  let message = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, message);
}

//Записуємо об'єкт в localStorage
function popularTextarea() {
  let parsedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parsedMessage) {
    // console.log('parsedMessage', parsedMessage);
    // console.log('message:', parsedMessage.message);
    // console.log('email:', parsedMessage.email);
    //1
    refs.messageEl.value = parsedMessage.message;
    refs.emailEl.value = parsedMessage.email;
    //2
    // if (parsedMessage.message) {
    //   refs.messageEl.value = parsedMessage.message;
    // }
    // if (parsedMessage.email) {
    //   refs.emailEl.value = parsedMessage.email;
    // }
    //3
    // parsedMessage.message === undefined
    //   ? (refs.messageEl.value = ' ')
    //   : (refs.messageEl.value = parsedMessage.message);
    // console.log('message:', refs.messageEl.value);

    // parsedMessage.email === undefined
    //   ? (refs.emailEl.value = ' ')
    //   : (refs.emailEl.value = parsedMessage.email);
    // console.log('email:', refs.emailEl.value);
  }
}
