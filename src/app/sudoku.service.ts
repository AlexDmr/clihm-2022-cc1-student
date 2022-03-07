import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BOARD, CI, columns, CV, GameState, gameToState, zones } from './Sudoku.data';

export type PlayReturns = {error: undefined | "cannot overhide an initial value" | "cannot overhide a non zero value"}

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  private sb: BehaviorSubject<GameState>;
  readonly obsGameState: Observable<GameState>; // = this.sb.asObservable();

  constructor() {
    const b: BOARD<CV> = [
      [0, 8, 0, 3, 0, 9, 5, 4, 0],
      [7, 4, 0, 6, 8, 0, 0, 9, 2],
      [0, 3, 0, 7, 0, 4, 1, 8, 0],
      [0, 5, 0, 0, 1, 0, 6, 0, 9],
      [8, 0, 9, 0, 3, 2, 7, 5, 0],
      [0, 1, 7, 9, 6, 0, 8, 0, 0],
      [0, 0, 8, 1, 0, 3, 0, 0, 5],
      [5, 9, 1, 2, 7, 0, 0, 6, 3],
      [4, 0, 0, 5, 9, 6, 2, 0, 8],
    ];
    this.sb = new BehaviorSubject<GameState>(
      gameToState({
        initialBoard: b,
        board: b,
        LC: columns(b),
        LZ: zones(b),
      })
    );
    this.obsGameState = this.sb.asObservable();
  }

  /**
   * play value v at line i and column j.
   * @param v the value to write
   * @param i the line where to write
   * @param j the column where to write
   */
  play(value: CV, i: CI, j: CI): PlayReturns {
    const {board, initialBoard, LC, LZ, LP} = this.sb.value;
    if ( LP[i][j].indexOf(value) >= 0 ) {
      const nboard: BOARD<CV> = board.map( (L, x) => x !== i ? L : L.map( (val, y) => y !== j ? val : value) );
      this.sb.next( gameToState({
        initialBoard,
        board: nboard,
        LC: columns(nboard),
        LZ: zones(nboard)
      }) );
      return {error: undefined};
    } else {
      if (initialBoard[i][j] !== 0) {
        return {error: 'cannot overhide an initial value'};
      } else {
        return {error: 'cannot overhide a non zero value'}
      }
    }
  }

}

