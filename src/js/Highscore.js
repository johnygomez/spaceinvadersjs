export default class Highscore {
  constructor() {
    this.ranking = JSON.parse(localStorage.getItem('highscores')) || [];
  }

  save(name, address, score) {
    let added = false;
    for (let i = 0; i < this.ranking.length; i++) {
      if (score > this.ranking[i].score) {
        this.ranking.splice(i, 0, { name: name, address: address, score: score });
        added = true;
        break;
      }
    }

    if (added === false)
      this.ranking.push({ name: name, address: address, score: score });
    localStorage.setItem('highscores', JSON.stringify(this.ranking));
  }

  reset() {
    localStorage.setItem('highscores', JSON.stringify([]));
  }
}
