const readMaze = (data) => {
  return data.split('\n').map(row => row.split(' '));
}

const maze = readMaze(
`e se se sw s
s nw nw n w
ne s h e sw
se n w ne sw
ne nw nw n n`
);

const testedMoves = {};

const moves = {
  'e': (position) => {
    if (position && position.col < maze[0].length-1) {
      return { row: position. row, col: position.col + 1 };
    }
  },
  's': (position) => {
    if (position && position.row < maze.length-1) {
      return { row: position.row + 1, col: position.col };
    }
  },
  'w': (position) => {
    if (position && position.col > 0) {
      return { row: position.row, col: position.col - 1 };
    }
  },
  'n': (position) => {
    if (position && position.row > 0) {
      return { row: position.row - 1, col: position.col };
    }
  },
  'se': position => moves.e(moves.s(position)),
  'sw': position => moves.w(moves.s(position)),
  'ne': position => moves.e(moves.n(position)),
  'nw': position => moves.w(moves.n(position)),
}

const positionKey = (from, to) => `${from.col},${from.row}->${to.col},${to.row}`

const findNextMove = (position, direction) => {
  const nextPosition = moves[direction](position);
  if (nextPosition) {
    return { position: nextPosition, direction, key: positionKey(position, nextPosition) };
  }
}

const findNextMoves = (position, lastDirection) => {
  const nextMoves = [];
  if (lastDirection) {
    const moveInLastDirection = findNextMove(position, lastDirection);
    if (moveInLastDirection) {
      nextMoves.push(moveInLastDirection);
    }
  }
  const newDirection = maze[position.row][position.col];
  const moveInNewDirection = findNextMove(position, newDirection);
  if (moveInNewDirection) {
    nextMoves.push(moveInNewDirection);
  }
  return nextMoves;
}

const findPathToHome = (position, direction, path) => {
  const current = maze[position.row][position.col];
  if (current === 'h') {
    return path;
  }

  const nextMoves = findNextMoves(position, direction);
  for (const move of nextMoves) {
    if (!testedMoves[move.key]) {
      testedMoves[move.key] = true;
      const newPath = path.concat([move.key]);
      const result = findPathToHome(move.position, move.direction, newPath);
      if (result) {
        return result;
      }
    }
  }
  return false;
}

const path = findPathToHome({row: 0, col: 2}, null, []);
console.log(path);
