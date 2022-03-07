import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BOARD, CI, CV } from '../Sudoku.data';
type temporalRange = [name: string, start: number, end: number | undefined];

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IAComponent implements OnInit {
  start = 0;
  readonly LTR = new BehaviorSubject<temporalRange[]>([]);
  readonly b: BOARD<CV> = [];

  constructor() { }

  ngOnInit(): void {
  }

  style(R: temporalRange): Object {
    const W = (R[2] ?? Date.now()) - R[1];
    const S = 0.1;
    console.log(this.start, R);
    return {
      position: "absolute",
      border: "solid black 1px",
      left: `${100 + (R[1] - this.start) * S}px`,
      width: `${W * S}px`,
      height: '1em'
    };
  }

  async displayComputeIA(): Promise<void> {
    this.LTR.next([]);
    this.start = Date.now();
    const L_IA_PLAY_logged: IA_PLAY[] = L_IA.map( (iaP, i) => ({compute: async board => {
      const id = `PLAYER ${i}`;
      const range: temporalRange = [id, Date.now(), undefined];
      this.LTR.next( [...this.LTR.value, range] )
      const res = await iaP.compute(board);
      this.LTR.next( this.LTR.value.map( R => R !== range ? R : [R[0], R[1], Date.now()] ) );
      return res;
    }}) );
    const L_IA_EVAL_logged: IA_EVAL[] = L_EV.map( (iaE, i) => ({compute: async (board, c) => {
      const id = `Evaluator ${i}`;
      const range: temporalRange = [id, Date.now(), undefined];
      this.LTR.next( [...this.LTR.value, range] )
      const res = await iaE.compute(board, c);
      this.LTR.next( this.LTR.value.map( R => R !== range ? R : [R[0], R[1], Date.now()] ) );
      return res;
    }}) );
    const res = await this.computeIA(L_IA_PLAY_logged, L_IA_EVAL_logged);
    console.log("computeIA =>", res);
  }

  private async computeIA(LP: readonly IA_PLAY[], LE: IA_EVAL[]): Promise<[value: CV, i: CI, j: CI]> {
    return [0, 0, 0];
  }

}


interface IA_PLAY {
  compute(b: BOARD<CV>): Promise<[value: CV, i: CI, j: CI]>;
}

interface IA_EVAL {
  compute(b: BOARD<CV>, p: [value: CV, line: CI, column: CI]): Promise<number>;
}

const L_IA: IA_PLAY[] = [
  {compute: (b) => new Promise( resolve => setTimeout( () => resolve([2, 1, 1]), 1000) ) },
  {compute: (b) => new Promise( resolve => setTimeout( () => resolve([5, 5, 3]),  500) ) },
]

const L_EV: IA_EVAL[] = [
  {compute: (b, c) => new Promise( resolve => setTimeout( () => resolve( Math.floor(100 * Math.random()) ), 1000) ) },
  {compute: (b, c) => new Promise( resolve => setTimeout( () => resolve( Math.floor(100 * Math.random()) ), 1500) ) },
  {compute: (b, c) => new Promise( resolve => setTimeout( () => resolve( Math.floor(100 * Math.random()) ),  500) ) },
]
