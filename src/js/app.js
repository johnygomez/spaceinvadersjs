import Background from './Background';
import Game from './Game';
import Highscore from './Highscore';

function showScores() {
  const highscore = new Highscore();
  const scoreboard = document.querySelector('#scoreboard');
  scoreboard.innerHTML = '';
  highscore.ranking.forEach((rank) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const info = document.createElement('p')
    li.className = 'collection-item';
    name.className = 'title';
    name.innerHTML = rank.name;
    info.innerHTML = 'Email: ' + rank.address + ', Score: ' + rank.score;
    scoreboard.appendChild(li);
    li.appendChild(name);
    li.appendChild(info);
  });
}

window.onload = function() {
  $('#menu li').click((e) => {
    const next = e.target.getAttribute('data-target');
    // if offline, disable all subpages - allow only game playing
    if (!window.navigator.onLine) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (next === 'rules') {
      e.preventDefault();
      e.stopPropagation();
      $('#rules').openModal();
      history.pushState('rules', 'Space Invaders | Rules', '#rules');
    } else if (next === 'hs') {
      e.preventDefault();
      e.stopPropagation();
      $('#highscores').openModal();
      showScores();
      history.pushState('hs', 'Space Invaders | Highscores', '#highscores');
    }

  });

  const container = document.querySelector('#main-container');
  const bg = new Background('main-container', container.offsetWidth, container.offsetHeight);
  const game = new Game('gameboard');
  bg.start();
  game.play();
}

window.onpopstate = function(e) {
  if (e.state === 'rules') {
    $('#rules').openModal();
  } else if (e.state === 'hs') {
    $('#highscores').openModal();
  }
}

// Detect online status and visually disable the subsection navigation
window.addEventListener('online', () => {
  const navLinks = document.querySelectorAll('nav li a');
  navLinks.forEach((el) => {
    el.style = '';
  });
})

window.addEventListener('offline', () => {
  const navLinks = document.querySelectorAll('nav li a');
  navLinks.forEach((el) => {
    el.style = 'text-decoration: line-through; cursor: default';
  });
})
