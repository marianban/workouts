
const input =
`O G
B O R O Y
O R B G R
B O G O Y
Y G B Y G
R O R B R`;

const input2 =
`R O Y P O
R R B R R R B P Y G P B B B G P B P P R
B G Y P R P Y Y O R Y P P Y Y R R R P P
B P G R O P Y G R Y Y G P O R Y P B O O
R B B O R P Y O O Y R P B R G R B G P G
R P Y G G G P Y P Y O G B O R Y P B Y O
O R B G B Y B P G R P Y R O G Y G Y R P
B G O O O G B B R O Y Y Y Y P B Y Y G G
P P G B O P Y G B R O G B G R O Y R B R
Y Y P P R B Y B P O O G P Y R P P Y R Y
P O O B B B G O Y G O P B G Y R R Y R B
P P Y R B O O R O R Y B G B G O O P B Y
B B R G Y G P Y G P R R P Y G O O Y R R
O G R Y B P Y O P B R Y B G P G O O B P
R Y G P G G O R Y O O G R G P P Y P B G
P Y P R O O R O Y R P O R Y P Y B B Y R
O Y P G R P R G P O B B R B O B Y Y B P
B Y Y P O Y O Y O R B R G G Y G R G Y G
Y B Y Y G B R R O B O P P O B O R R R P
P O O O P Y G G Y P O G P O B G P R P B
R B B R R R R B B B Y O B G P G G O O Y`

const parseSequence = input => input
  .split("\n")[0]
  .split(' ');
const sequence = parseSequence(input2);

const parseMaze = input => input
  .split("\n")
  .splice(1)
  .reverse()
  .map(line =>
    line.split(' ')
  );
const maze = parseMaze(input2);
const rows = maze.length - 1;
const cols = maze[0].length - 1;

const moveLeft = (position) => {
  if (position.col - 1 >= 0) {
    return { row: position.row, col: position.col - 1 };
  }
}

const moveRight = (position) => {
  if (position.col + 1 <= cols) {
    return { row: position.row, col: position.col + 1 };
  }
}

const moveTop = (position) => {
  if (position.row + 1 <= rows) {
    return { row: position.row + 1, col: position.col };
  }
}

const moveDown = (position) => {
  if (position.row - 1 >= 0) {
    return { row: position.row - 1, col: position.col };
  }
}

const findNextPositions = (position, color) => {
  const positions = [
    moveLeft(position),
    moveTop(position),
    moveRight(position),
    moveDown(position)
  ];

  return positions.filter(nextPosition => nextPosition && maze[nextPosition.row][nextPosition.col] === color);
}

const positionKey = position => position.row + "_" + position.col;

const testedMoves = {};

const move = (fromPosition, toPosition) => {
  const fromKey = positionKey(fromPosition);
  const toKey = positionKey(toPosition);
  return fromKey + "->" + toKey;
}

const skipTestedMoves = (currentPosition, nextPositions) => {
  return nextPositions.filter(nextPosition => {
    const nextPositionKey = positionKey(nextPosition);
    return !testedMoves[move(currentPosition, nextPosition)];
  })
}

const computeNextSequenceIndex = sequenceIndex => sequenceIndex + 1 >= sequence.length ? 0 : sequenceIndex + 1;

const findPath = (position, sequenceIndex, path) => {
  const color = maze[position.row][position.col];
  const newPath = [...path, { color: color, row: position.row, col: position.col }];

  if (position.row === rows) {
    return newPath
  }

  const nextSequenceIndex = computeNextSequenceIndex(sequenceIndex);
  const nextColor = sequence[nextSequenceIndex];
  const nextPositions = skipTestedMoves(position, findNextPositions(position, nextColor));
  for (const nextPosition of nextPositions) {
    testedMoves[move(position, nextPosition)] = true;
    const result = findPath(nextPosition, nextSequenceIndex, newPath)
    if (result) {
      return result;
    }
  }

  return false;
}

const findStartPositions = () => {
  const startPostions = [];
  for (let col=0; col<cols; col++) {
    const color = maze[0][col];
    if (color === sequence[0]) {
      startPostions.push({ row: 0, col: col });
    }
  }
  return startPostions;
}

const findPathFromBegining = () => {
  const startPositions = findStartPositions();
  for (const startPosition of startPositions) {
    const result = findPath(startPosition, 0, []);
    if (result) {
      return result;
    }
  }
  return false;
}

const emptyMaze = () => {
  const empty = [];
  for (let row=0; row <= rows; row++) {
    const colums = [];
    for (let col=0; col <= cols; col++) {
      colums.push('/');
    }
    empty.push(colums);
  }
  return empty;
}

const print = (maze) => {
  return maze.map(columns => columns.join(' ')).reverse().join("\n");
}

const printPath = (path) => {
  const empty = emptyMaze();
  for (const step of path) {
    empty[step.row][step.col] = step.color;
  }
  return print(empty);
}

console.log(printPath(findPathFromBegining()));
