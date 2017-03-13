import $ from 'jquery/dist/jquery.min';
import WTGM from './wtgm';

$(document).ready(() => {
  $('.startGame').on('mousedown touchstart', (e) => {
    e.preventDefault();
    WTGM.setScore();
    WTGM.startGame();
    $('.ui').hide();
    $('canvas').show();
    $('.openMenu').show();
  });

  $('.toBaby').on('mousedown touchstart', (e) => {
    e.preventDefault();
    document.location.href = 'baby.html';
  });

  $('.toKids').on('mousedown touchstart', (e) => {
    e.preventDefault();
    document.location.href = 'index.html';
  });

  $('.openMenu').on('mousedown touchstart', (e) => {
    e.preventDefault();
    WTGM.paused = 1;
    if (!WTGM.hit) {
      WTGM.hit = 1;// keine minuspunkte
    }
    $('.startGame').text('Neustart');

    $('.inGameOption').show();
    $('.inMenuOption').hide();
    $('.ui').addClass('gameRunning');
    $('.ui').show();
    $('.openMenu').hide();
  });

  $('.resumeGame').on('mousedown touchstart', (e) => {
    e.preventDefault();

    if (!WTGM.hit) {
      WTGM.hit = 1; // keine minuspunkte
    }
    $('.ui').hide();
    $('.openMenu').show();

    WTGM.paused = 0;
  });
});