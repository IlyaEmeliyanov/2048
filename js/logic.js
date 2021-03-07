const allowedKeys = ["W", "A", "S", "D"];

document.addEventListener("keypress", (e) => {
  // Splitting the string in 2 parts and taking the 2nd
  const key = e.code.split("Key")[1]; // for example if the keycode = KeyW => key = W

  switch (key) {
    // Key: W 
    case allowedKeys[0]:
      // Aligning the cells to the top on the the vertical axis
      moveVertical("start");
      break;
    // Key: A
    case allowedKeys[1]:
      // Aligning the cells to the left on the the horizontal axis
      moveHorizontal("start");
      break;
    // Key: S
    case allowedKeys[2]:
      // Aligning the cells to the bottom on the the vertical axis
      moveVertical("end");
      break;
    // Key: D
    case allowedKeys[3]:
      // Aligning the cells to the right on the the horizontal axis
      moveHorizontal("end");
      break;
    // Key: other key => exit the function
    default:
      return;
  }

  // Start the game by adding the number to the cell's matrix and rendering the table and the score
  addNumberToTable(cells);
  renderTable(cells);
  renderScore(score);
});


// MOVING THE CELLS: VERTICAL/HORIZONTAL
// Shift all the elements on the vertical axis
function moveVertical(alignPos) {
  for (let j = 0; j < size; j++) {
    let cellsCol = selectCol(cells, j, size, size);
    formatCells(cellsCol, alignPos);

    for (let i = 0; i < size; i++) {
      cells[i][j] = cellsCol[i];
    }
  }
}

// Shift all the elements on the horizontal axis
function moveHorizontal(alignPos) {
  for (let i = 0; i < size; i++) {
    let cellsRow = selectRow(cells, i); // Selecting a single row
    formatCells(cellsRow, alignPos);
  }
}



// CELLS' FORMATTING FUNCTIONS
// Formatting the matrix array (row or column)
function formatCells(array, alignPos) {
  // Delete all the '0'
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 0) {
      array.splice(i, 1);
      i--;
    }
  }

  //   Sum all the equal adjacent numbers
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      array[i + 1] += array[i];
      console.log(`Score: ${score} || Number ${array[i+1]}`);
      score += array[i+1];

      // Delete the last number (array[i]) from the array
      array.splice(i, 1);
    }
  }

  // Add zeros to fill the array up to the needed size
  while (array.length < size) {
    if (alignPos === "start") array.push(0);
    else if (alignPos === "end") {
      array.unshift(0);
    }
  }
}



// NUMBERS MANIPULATION FUNCTIONS
// Generate the grid
function generateNumbers() {
  // Matrix containinig numbers
  let cellsNumbers = [];

  const randomRow1 = Math.floor(Math.random() * size);
  const randomCol1 = Math.floor(Math.random() * size);

  // 2 cell's position must not be the same: they must have at least different size or size
  let randomRow2;
  let randomCol2;
  do {
    randomRow2 = Math.floor(Math.random() * size);
    randomCol2 = Math.floor(Math.random() * size);
  } while (randomRow2 === randomRow1 || randomCol2 === randomCol1);

  for (let i = 0; i < size; i++) {
    cellsNumbers.push([]);
    for (let j = 0; j < size; j++) {
      cellsNumbers[i].push(0);
    }
  }

  cellsNumbers[randomRow1][randomRow2] = 2;
  cellsNumbers[randomRow2][randomCol2] = 2;

  return cellsNumbers;
}

// Add the number '2' to the table in a random place on every move
function addNumberToTable(cells) {
  let randomRow = 0,
    randomCol = 0;

  while (cells[randomRow][randomCol] !== 0) {
    randomRow = Math.floor(Math.random() * size);
    randomCol = Math.floor(Math.random() * size);
  }

  cells[randomRow][randomCol] = 2;
}



// CELLS MANIPULATION FUNCTIONS
// Select the array of cells on the vertical axis
function selectCol(matrix, index, size, size) {
  const col = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (j === index) col.push(matrix[i][j]);
    }
  }
  return col;
}

// Select the array of cells on the horizontal axis
function selectRow(matrix, index) {
  return matrix[index];
}