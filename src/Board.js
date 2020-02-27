import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=4, ncols=4, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i=0; i<nrows; i++) {
      let row = [];
      for(let j=0; j<ncols; j++) {
        //assign f or t using chanceLightStartsOn
        let randomNum = Math.random();
        let trueOrFalse = randomNum > chanceLightStartsOn;
        row.push(trueOrFalse);
      } 
      initialBoard.push(row);
    }
    // create array-of-arrays of true/false values
    return initialBoard;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      let boardCopy = oldBoard.map(tr => [...tr]);

      // in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy);
      flipCell(y-1,x,boardCopy);
      flipCell(y+1,x,boardCopy);
      flipCell(y,x-1,boardCopy);
      flipCell(y,x+1,boardCopy);
  
      return boardCopy;
    });
    
  }
  
  // if the game is won, just show a winning msg & render nothing else
  function checkForWin() {
    return board.every(subarray => subarray.every(myVal => myVal === true));
  }
  if (checkForWin()){
    return(
      <h1>YOU WON!!</h1>
    )
  }
  // make table board

  return (
    <table className="Board">
      {board.map((row, i) => (
        <tr> 
          {row.map((cell,j) => (
            <Cell 
              isLit={ cell } 
              flipCellsAroundMe={()=> flipCellsAround(`${i}-${j}`)}
            /> ))}
        </tr>
        )
      )}
    </table>
  )
}

export default Board;
