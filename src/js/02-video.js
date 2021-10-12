import Player from '@vimeo/player';
const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const currentTime = {};

player.on('play', function (currentTime) {
  console.log('Відео відтворюється! Поточний час:', currentTime);
  console.log(currentTime);
});

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

iframe.addEventListener('pause', on);
