export function isItADraw(grid) {
  return grid.filter(player => !player).length === 0 &&
    !isWinner('X', grid) &&
    !isWinner('O', grid);
}

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function isWinner(player, grid) {
  return winningPositions.some(positions => positions.every(pos => grid[pos] === player));
}
