'use client'

import Board from "@/app/ui/board"
import Circle from "@/app/ui/circle"

import { BaseSyntheticEvent, useEffect, useState } from "react"
import { AppContext, initTiles, Tiles } from "./lib/app-context"
import { displayPlayer } from "./lib/player-display"

export default function Home() {
  const initScores = [{ player: 1, score: 0, scores: [] }, { player: 2, score: 0, scores: [] }]
  const [tiles, setTiles] = useState(Array.from(initTiles))
  const [isGameOver, setIsGameOver] = useState(false)
  const [turn, setTurn] = useState(1)
  const [nextTurn, setNextTurn] = useState(1)
  const [winner, setWinner] = useState(0)
  const [isDraw, setIsDraw] = useState(false)
  const [size, setSize] = useState(6)
  const [coords, setCoords] = useState([])
  const [playerScores, setPlayerScores] = useState(initScores)
  const boardSize = [6, 7, 8, 9, 10]

  useEffect(() => {
    createTiles(size);
  }, [size])

  // Create board tiles with specify number
  const createTiles = (size: number) => {
    const rows = new Array(size)
    const newTiles = Array.from(rows, () => new Array(size).fill(0))
    setTiles(newTiles);
    return newTiles
  }

  // NEW GAME
  const newGame = () => {
    if (winner === 1) {
      setNextTurn(2)
      setTurn(1)
    } else {
      setNextTurn(1)
      setTurn(2)
    }
    setWinner(0)
    setIsGameOver(false)
    setIsDraw(false)
    createTiles(size)
    setCoords([])
  }

  // Size select change
  const handleSizeChange = (event: BaseSyntheticEvent) => {
    const newSize = event.target.value
    setSize(Number(newSize))
    newGame()
  }

  // New Game button clic
  const handleNewGameClick = () => {
    newGame()
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="absolute p-4">
        Created by <a className="bg-amber-600 px-2 py-1 rounded-lg" target="_blank" href="https://github.com/pockiiie/tic-tac-toe">pockiiie</a>
      </div>
      {/* Assign variables and functions in to value of BoardContext Provider then 
        you can use it in any child component via react.useContext function */}
      <AppContext.Provider value={{
        tiles, setTiles,
        isGameOver, setIsGameOver,
        turn, setTurn,
        nextTurn, setNextTurn,
        winner, setWinner,
        isDraw, setIsDraw,
        size, setSize,
        coords, setCoords,
        playerScores, setPlayerScores,
      }}>
        <main className="grid grid-col-1 gap-0 items-center justify-center min-h-lvh">
          <div className="w-full flex justify-center">
            <select name="size" id="size"
              onChange={handleSizeChange}
              className="block w-52 px-2 py-0 mx-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {
                boardSize.map(size => {
                  return (
                    <option key={size} value={size}>{size + 'x' + size}</option>
                  )
                })
              }
            </select>
            <button className="bg-slate-600 rounded-md p-2"
              type="button"
              onClick={handleNewGameClick}
            >
              New Game
            </button>
          </div>
          <div className="w-full">
            <Board />
          </div>
          <div className="w-full flex justify-between">
            <Circle baseClass="h-10 w-10 rounded-[4rem]" innerClass="h-6 w-6 rounded-[3rem]" player={1} showScore/>
            <Circle baseClass="h-10 w-10 rounded-[4rem]" innerClass="h-6 w-6 rounded-[3rem]" player={2} showScore/>
          </div>
          <div className="w-full text-[6vh] text-center">

            {/* Next Player Display */}
            <div className={`${(winner === 0 && !isDraw) ? 'flex justify-center items-center' : 'hidden'}`}>
              <div>
                Player
              </div>
              <Circle baseClass="ml-2 h-14 w-14 rounded-[4rem]" innerClass="h-11 w-11 rounded-[3rem]" player={nextTurn} />
            </div>

            {/* Winner Display */}
            <div className={`${(winner !== 0 && !isDraw) ? 'flex justify-center items-center' : 'hidden'}`}>
              <div>
                Winner is
              </div>
              <Circle baseClass="ml-2 h-14 w-14 rounded-[4rem]" innerClass="h-11 w-11 rounded-[3rem]" player={winner} />
            </div>

            <div className={`${isDraw ? 'block' : 'hidden'}`}>
              TIE is a LAME!
            </div>
          </div>
        </main>
      </AppContext.Provider>
    </div>
  );
}
