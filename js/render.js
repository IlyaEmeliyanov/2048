const gameTable = document.getElementsByClassName("game-table").item(0);
let scoreTitle = document.getElementsByClassName('score__title').item(0);

// Parametres based on which the table is constructed
const size = 4;

// Number of cells in table
let cells = [];

// User's score
let score = 0;


// Start of the game
function start() {
  // Regenerating cells
  cells = generateNumbers();
  // Setting score to 0
  score = 0;

  // Rerendering the score and the cells
  renderScore(score);
  renderTable(cells);
}

// Based on the cell's number return the background color
function getBackgroundColor(number) {
    let color;
    switch (number) {
        case 2:
            color = 'ccc1b3';
            break;
        case 4:
            color = 'eee1c9';
            break;
        case 8:
            color = 'f2b379';
            break;
        case 16:
            color = 'f69663';
            break;
        case 32:
            color = 'f67d5f';
        case 64:
            color = 'f65f3b';
            break;
        case 128:
            color = 'edcf72';
            break;
        case 256:
            color = 'edcb61';
            break;
        case 512:
            color = 'edc750';
            break;
        case 1024:
            color = 'edc53e';
            break;
        case 2048:
            color = 'ecc22d';
            break;
        default: 
            color = 'ede4da';
            break;
    }
    return color;
}

// Dynamically render the content table
function renderTable(cellsNumbers) {
  let cellsString = "";
  let formattedRow = "";
  for (let i = 0; i < size; i++) {
    formattedRow = `<tr height="200px">`;
    for (let j = 0; j < size; j++) {
      formattedRow += `
            <th width="200px" bgcolor=${getBackgroundColor(cellsNumbers[i][j])} class="table__cell" style="transition: 0.3 ease-in-out;">
                <h2 class="cell__title" style="font-size: 4.5rem;">
                    ${cellsNumbers[i][j] === 0 ? " " : cellsNumbers[i][j]}
                </h2>
            </th>`;
    }
    formattedRow += "</tr>";
    // Add the formattedString to the big cellsString
    cellsString += formattedRow;
  }

  // Rerender the gameTable
  gameTable.innerHTML = cellsString;
}

// Render the score
function renderScore(score) {
  scoreTitle.innerHTML = score;
}

start();
