import { createContext, useContext } from "react";

// Define type for setFunction of useState
export type TileType = number[][]

// export const initTiles = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ]

export const initTiles = [
  [2, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 1, 2, 2, 1, 1],
  [1, 1, 2, 1, 2, 1, 1, 1],
  [1, 1, 2, 2, 1, 1, 1, 1],
  [1, 1, 2, 1, 2, 1, 1, 1],
  [1, 2, 2, 1, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 1, 2, 1],
  [2, 2, 2, 2, 1, 1, 1, 0],
]

// export const initTiles = [
//   [2, 1, 1, 1, 1, 1, 2, 1],
//   [1, 2, 2, 1, 2, 2, 1, 1],
//   [1, 1, 2, 1, 2, 1, 1, 1],
//   [1, 1, 2, 2, 1, 1, 1, 1],
//   [1, 1, 2, 1, 2, 1, 1, 1],
//   [1, 2, 2, 1, 2, 2, 1, 1],
//   [2, 1, 2, 1, 2, 1, 2, 1],
//   [2, 2, 2, 2, 1, 1, 1, 2],
// ]

// for testing
// const expectedResult =  [
//   [[0, 1], [0, 2], [0, 3], [0, 4]], // 1 blue horizontal
//   [[3, 4], [3, 5], [3, 6], [3, 7]], // 1 blue horizontal
//   [[7, 0], [7, 1], [7, 2], [7, 3]], // 2 red horizontal
//   [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]], // 2 red vertical
//   [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]], // 2 red vertical
//   [[1, 6], [2, 6], [3, 6], [4, 6], [5, 6]], // 1 blue vertical
//   [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]], // 1 blue vertical
//   [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]], // 2 red diagonal right
//   [[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0]], // 2 red diagonal left
//   [[0, 7], [1, 6], [2, 5], [3, 4], [4, 3]], // 1 blue diagonal left
//   [[2, 3], [3, 4], [4, 5], [5, 6], [6, 7]], // 1 blue diagonal right ***
//   [[4, 7], [5, 6], [6, 5], [7, 4]] // 1 blue diagonal left
// ]

// createContext parameters must be the same as useState variable and function to set in Provider
export const AppContext = createContext({
  tiles: initTiles,
  setTiles: (_: TileType) => { }, //mimic useState setFunction
  isGameOver: false,
  setIsGameOver: (_: boolean) => { },
  turn: 0,
  setTurn: (_: number) => { },
  nextTurn: 0,
  setNextTurn: (_: number) => { },
  winner: 0,
  setWinner: (_: number) => { },
  isDraw: false,
  setIsDraw: (_: boolean) => { },
  size: 3,
  setSize: (_: number) => { }
})

export const useAppContext = () => useContext(AppContext)