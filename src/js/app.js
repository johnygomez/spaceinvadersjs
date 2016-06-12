import Background from './Background';
import Game from './Game';
import Highscore from './Highscore';

// X-browser compatibility for page visibility API
let hidden, state, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
  state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
  state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
  state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
  state = "webkitVisibilityState";
}


// Display the scoreboard
function showScores() {
  const highscore = new Highscore();
  const scoreboard = document.querySelector('#scoreboard');
  scoreboard.innerHTML = '';
  highscore.ranking.forEach((rank) => {
    // for each record in highscores display an element in scoreboard list
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
    // page navigation using Histori API
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

  // initialize animated background ang game engine
  const container = document.querySelector('#main-container');
  const bg = new Background('main-container', container.offsetWidth, container.offsetHeight);
  const game = new Game('gameboard');
  bg.start();
  game.play();

  // pause the game (and bg) when tab is not active
  document.addEventListener(visibilityChange, (e) => {
    if (document.visibilityState === hidden) {
      game.pause();
      bg.renderer.pause();
    } else {
      game.resume();
      bg.renderer.unpause();
    }
  }, false);
}

// Handling of back button click in browser
window.onpopstate = function(e) {
  if (e.state === 'rules') {
    $('#rules').openModal();
  } else if (e.state === 'hs') {
    $('#highscores').openModal();
  }
}

// Detect online status and visually enable/disable the subsection navigation
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
