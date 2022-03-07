
export type CI = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CV = CI | 9;
export type BOARD<T> = readonly (readonly T[])[];
export const values: readonly CV[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface Game {
  readonly initialBoard: BOARD<CV>;
  readonly board: BOARD<CV>;
  readonly LC: BOARD<CV>;
  readonly LZ: BOARD<CV>;
}

export interface GameState extends Game {
  readonly LP: BOARD<readonly CV[]>;
}

/**
 * Returns a board b' such as the lines of b' are the columns of b.
 */
export function columns(b: BOARD<CV>): BOARD<CV> {
  return [];
}

/**
 * Returns a board b' such as lines of b' are zones of b.
 * zones index :
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
export function zones(b: BOARD<CV>): BOARD<CV> {
  return [];
}

/** Completes g with LP, the list of possible values for each position.
 * If the position correspond to an original value, then the list is empty.
 * Otherwise, if the position correspond to an already specified value, the list only contains 0.
 * Otherwise, the list contains possible values (always including 0).
 */
export function gameToState(g: Game): GameState {
  return {
    ...g,
    LP: []
  };
}

function Difference<T>(LV: readonly T[], ...LL: readonly (readonly T[])[]): readonly T[] {
    return LV.filter( v => !LL.find( L => L.indexOf(v) >= 0 ) )
}