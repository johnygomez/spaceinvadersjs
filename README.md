# SPACE INVADERS
This is an implementation of popular arcade game Space Invaders (1978) in Javascript using Canvas technology.

### [Example](https://www.gamec.sk/spaceinvaders/)

## Dependencies
[MaterializeCSS](http://materializecss.com/) - Website UI elements (nav, modals, colors..)

[jQuery](https://github.com/jquery/jquery) - Events binding, selectors..

[Snap.SVG](http://snapsvg.io/) - SVG animation

[MediaElement.js](http://mediaelementjs.com/) - To play youtube video in HTML5 video tag

## Description
The game engine is written in pure Javascript using ES2015 standard (Classes). Source files are validated with [ESLINT](http://eslint.org/) and built with [Babelify](https://github.com/babel/babelify) Plugin.
Engine contains main [GAME](src/js/Game.js), which handles state transitions of game. Also contains current game settings and state information like score and lives left.
Game contains several game entities, like invaders, bombs, rockets and more, which all inherit from general class [OBJ](src/js/Obj.js). Each game entity can be drawn on canvas.
It also contains current state info, like position, speed etc. The most important part of the game are game states, each extending basic [State class](src/js/State.js).
Each state can contain methods like: 
* **Enter** - triggers when game enters the state
* **Leave** - triggers when game leaves the state
* **Update** - updates state variables
* **Draw** - Redraw current state and game entities
* **KeyUp/KeyDown** - React to player's keyboard input
The key state is, of course, the [Play State](src/js/PlayState.js), which handles all game updates. This includes **updating** the invaders, bombs, ship and rockets **positions**, **evaluating** collisions between game entities and updating the state according to that,
and also reacting to keyboard input, like moving the ship or firing the rockets.

Another curious part is game rendering engine in [Renderer Class](src/js/Renderer.js) which updates target update function at given FPS rate.
