import {isItADraw, isWinner} from "./rules.js";

export default class TicTacToe {
  constructor() {
    this.grid = [...new Array(9)];
    this.player = Math.round(Math.random()) ? 'X' : 'O';
    this.winner = false;
    this.moves = 0;
  }

  move(position) {
    if (!this.isGameOver && !this.grid[position]) {
      this.grid[position] = this.player;

      if (++this.moves >= 5) {
        if (isWinner(this.player, this.grid)) {
          this.winner = this.player;
        } else if (isItADraw(this.grid)) {
          this.winner = 'draw';
        }
      }

      this.player = this.player === 'O' ? 'X' : 'O';
    }
  }

  get isGameOver() {
    return !!this.winner;
  }

  get hasXWon() {
    return this.winner === 'X';
  }

  get hasOWon() {
    return this.winner === 'O';
  }

  get isItADraw() {
    return this.winner === 'draw';
  }
}
