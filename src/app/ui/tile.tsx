'use client'

import { BaseSyntheticEvent, useState } from "react"
import { useAppContext, TileType } from "../lib/app-context"
import { displayPlayer } from "../lib/player-display"
import { findConsecutiveSequences } from "../lib/score"

export default function Tile({ own, position }: { own: number, position: number[] }) {

  // const [coords, setCoords] = useState([])
  let coords: string[] = []
  // all params came from AppContext.Provider in page.tsx
  const {
    tiles,
    setTiles,
    isGameOver,
    setIsGameOver,
    turn,
    setTurn,
    setNextTurn,
    setWinner,
    setIsDraw,
    size,
  } = useAppContext()

  // Check is Board doesn't have a blank tile
  const isBoardFull = () => {
    const result = tiles.flat().every(el => el !== 0)
    return result
  }

  const isInCoords = (position: string) => {
    const result = coords.some(coord => coord === position)
    return result
  }

  // Find the winner
  const findWinner = () => {
    return { player: 0, isWin: false }
  }

  // Handle player click on tile
  const handleTileClick = (event: BaseSyntheticEvent) => {
    if (isGameOver) return;

    const { currentTarget } = event
    const [x, y] = currentTarget?.querySelector('input')?.value?.split(',')

    // Prevent player click on the already clicked tile
    if (tiles[x][y] != 0) return

    const newTurn: number = (turn === 1) ? 2 : 1

    tiles[x][y] = newTurn
    setTurn(newTurn)
    setNextTurn((newTurn === 1) ? 2 : 1)
    setTiles(tiles)

    const result = findConsecutiveSequences(tiles)
    if (result.sequences.length) {
      let coordinates: any = result.sequences.map(sequence => sequence.coordinates)
      coords = coords.concat(coordinates.flat())
    }

    if (isBoardFull()) {
      setIsGameOver(true)
    }

    // const result = findWinner()
    // if (result.isWin) {
    //   setWinner(result.player)
    // }
  }

  return (
    <div className={`bg-gray-800 w-auto rounded-[2rem] flex justify-center items-center overflow-clip
      p-1
      border-4 border-slate-600
      transition-colors duration-200
      ${size === 6 && 'h-[6.4vh] md:h-[11vh] rounded-[3rem]'}
      ${size === 7 && 'h-[5.4vh] md:h-[9.4vh] rounded-[2.5rem]'}
      ${size === 8 && 'h-[4.8vh] md:h-[8.2vh]'}
      ${size === 9 && 'h-[4.2vh] md:h-[7vh]'}
      ${size === 10 && 'h-[3.8vh] md:h-[6.4vh]'}
      ${own === 1 && 'bg-blue-700'}
      ${own === 2 && 'bg-red-700'}
      ${own === 0 && 'bg-gray-700'}
      `}
      onClick={handleTileClick}
    >
      <span className="absolute text-white text-xs float-left">{position.toString()}</span>
      <div className={`
      w-3/4 h-3/4
      rounded-[2rem]
      transition-colors duration-200
      ${isInCoords(position.toString()) && 'opacity-10'}

       ${own === 1 && 'bg-blue-500'}
      ${own === 2 && 'bg-red-500'}
        `}>

        <div className={`
        text-8xl md:text-[20vh] w-full text-center opacity-50
        invisible
        ${size === 6 && 'md:text-[9vh]'}
        ${size === 7 && 'md:text-[8vh]'}
        ${size === 8 && 'md:text-[7vh]'}
        ${size === 9 && 'md:text-[6vh]'}
        ${size === 10 && 'md:text-[5vh]'}
        `}>
          <input type="hidden" name="tileNumber" value={position.toString()} />
          {displayPlayer(own)}
        </div>
      </div>
    </div>
  )
}