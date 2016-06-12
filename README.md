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

### For easier semestral work evaluation...
* **Validity** - *W3C validator* :heavy_check_mark:
* **X-Browser Compatibility** - :heavy_check_mark:
* **Semantic tags** - e.g. [index.html 16-45](src/index.html#L16-L45) :heavy_check_mark:
* **Microdata** - [index.html](src/index.html#L52-L66) :heavy_check_mark:
* **SVG/Canvads** - [index.html](src/index.html#L19-L32) and whole game...:heavy_check_mark:
* **Form** - [index.html](src/index.html#L115-L127) + validation in JS:heavy_check_mark:
* **Offline Manifest** - [Manifest](src/offline.manifest) + [index.html](src/index.html#L2):heavy_check_mark:

* **Advanced Selectors** - e.g. [Styles](src/css/main.scss#L75) :heavy_check_mark:
* **Vendor Prefixes** - e.g. [Mixins](src/css/mixins.scss) :heavy_check_mark:
* **Transformation/Animation** - [How To styles](src/css/rules.scss) :heavy_check_mark:
* **2D/3D transformations** - [How To styles](src/css/rules.scss) :heavy_check_mark:
* **Media queries** - Basically this handles MaterializeCSS but e.g. [Styles](src/css/main.scss#L104) :heavy_check_mark:

* **OOP** - ES6 Classes - whole game is object oriented :heavy_check_mark:
* **JS framework** - jQuery, MaterializeCSS... :heavy_check_mark:
* **New JS APIs** - [Page Visibility Api](src/js/app.js#L79-L88), [LocalStorage](src/js/Highscore.js), Offline API, History API, ES6...(:heavy_check_mark:
* **History API** - [History API](src/js/app.js#L91-L97) :heavy_check_mark:
* **Audio media** - [Game sounds](src/js/PlayState.js#L32-L34) :heavy_check_mark:
* **Offline App** - [Offline API](src/js/app.js#L100-L112) :heavy_check_mark:
* **SVG** - SVG animated title - click on the invader icon :heavy_check_mark:
