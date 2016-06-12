// Records player's highscore in LocalStorage
export default class Highscore {
  constructor() {
    // Retrieve highscores from localstorage or create new array
    this.ranking = JSON.parse(localStorage.getItem('highscores')) || [];
  }

  save(name, address, score) {
    let added = false;
    // Find position for current score
    for (let i = 0; i < this.ranking.length; i++) {
      if (score > this.ranking[i].score) {
        this.ranking.splice(i, 0, { name: name, address: address, score: score });
        added = true;
        break;
      }
    }

    if (added === false)
      this.ranking.push({ name: name, address: address, score: score });
    // Serialize scoreboard and save to LocalStorage
    localStorage.setItem('highscores', JSON.stringify(this.ranking));
  }

  // Clear the localstorage highscore entry and set with empty array
  reset() {
    localStorage.setItem('highscores', JSON.stringify([]));
  }
}
