import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const currentTime = {};

player.on('timeupdate', throttle(playedTime, 1000));

function playedTime(currentTime) {
  //   console.log('Відео відтворюється! Поточний час:', currentTime);
  console.log('currentTime:', currentTime);
  const time = JSON.stringify(currentTime);
  //   console.log('time', time);
  localStorage.setItem(STORAGE_KEY, time);
}

iframe.addEventListener('play', onCurrentTime);

function onCurrentTime(data) {
  const savedCurrentTime = JSON.stringify(currentTime);
  localStorage.setItem(STORAGE_KEY, savedCurrentTime);
  console.log(JSON.stringify(savedCurrentTime));
  console.log(savedCurrentTime);
}
let savedTime = localStorage.getItem(STORAGE_KEY);
let parsedTime = JSON.parse(savedTime);

player.setCurrentTime(parsedTime?.['seconds'] || 0).then(function (seconds = 0) {});
// https://javascript.info/optional-chaining
