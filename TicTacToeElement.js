import TicTacToe from './TicTacToe.js';

class TicTacToeElement extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'closed'});
    this.game = new TicTacToe();

    this.initBoard();
    this.drawBoard();
    this.tick();
  }

  initBoard() {
    this.styles = document.createElement('link');
    this.styles.rel = 'stylesheet';
    this.styles.href = './TicTacToe.css';
    this.shadow.appendChild(this.styles);

    this.board = document.createElement('div');
    this.board.className = 'board';

    this.cells = this.game.grid.map(() => {
      const cell = document.createElement('div');
      cell.className = 'board__cell';
      this.board.appendChild(cell);

      return cell;
    });

    this.board.addEventListener('click', e => {
      if (e.target.classList.contains('board__cell') &&
          !this.game.gameOver
      ) {
        this.move(this.cells.indexOf(e.target));
      }
    });

    this.shadow.appendChild(this.board);

    this.gameOver = document.createElement('div');
    this.gameOver.className = 'game_over';
    this.shadow.appendChild(this.gameOver);

    this.currentPlayer = document.createElement('div');
    this.currentPlayer.className = 'current_player';
    this.shadow.appendChild(this.currentPlayer);
  }

  drawBoard() {
    this.game.grid.forEach((player, cellIndex) => {
      if (player) {
        this.cells[cellIndex].innerText = player;
        this.cells[cellIndex].className = `board__cell board__cell--${player}`;
      } else {
        this.cells[cellIndex].className = 'board__cell board__cell--empty';
      }
    });
  }

  move(position) {
    this.game.move(position);
    this.drawBoard();
    this.tick();
  }

  tick() {
    setTimeout(() => {
      if (this.game.isGameOver) {
        this.showGameOver();
      } else {
        this.displayCurrentPlayer(this.game.player);
      }
    }, 100);
  }

  showGameOver() {
    this.currentPlayer.classList.add('current_player--hide');

    this.gameOver.innerText = `
      GAME OVER!
      ${this.game.isItADraw
        ? "IT'S A DRAW!!"
        : `${this.game.winner} WINS!!!`
      }
    `;
  }

  displayCurrentPlayer(player) {
    this.currentPlayer.innerText = `It's ${player}'s turn`;
  }
}

window.customElements.define('tic-tac-toe', TicTacToeElement);
