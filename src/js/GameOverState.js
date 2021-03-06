import State from './State';
import PreloadState from './PreloadState';

// Game over state
// When entered, asks user to record his highscore using form
export default class GameOverState extends State {
  draw() {
    this.ctx.clearRect(0, 0, this.game.width, this.game.height);
    this.ctx.font='30px Arial';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textBaseline='center';
    this.ctx.textAlign='center';
    this.ctx.fillText('Game Over!', this.game.width / 2, this.game.height/2 - 40);
    this.ctx.font='16px Arial';
    this.ctx.fillText('Press \'Enter\' to restart the game', this.game.width / 2, this.game.height/2);
  }

  enter() {
    this.draw();
    // Open highscore form
    $('#score-form').openModal();
    // Autofocus on the first field
    $('#name').focus();
    $('#save-score').click((e) => {
      const email = $('#email');
      const name = $('#name');
      // form validation
      validate_field(email);

      // basic validation
      if (email.hasClass('invalid') || email.val().length === 0 || name.val().length === 0) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // save game and close modal
      this.game.highscore.save(name.val(), email.val(), this.game.score);
      $('#score-form').closeModal();
    });
  }

  // Restart the game with 'ENTER' key
  keyDown(keyCode) {
    if (keyCode === 13) {
        this.game.lives = 3;
        this.game.state = new PreloadState(this.game, this.ctx);
    }
  }
}