'use client'

import { BaseSyntheticEvent, useState, useEffect } from "react"
import { useAppContext, Tiles, initTiles } from "../lib/app-context"
import { findConsecutiveSequences, getScore, Sequence } from "../lib/score"
import { displayPlayer } from "../lib/player-display"

export default function Board() {
  const {
    tiles,
    setTiles,
    isGameOver,
    setIsGameOver,
    turn,
    setTurn,
    nextTurn,
    setNextTurn,
    winner,
    setWinner,
    setIsDraw,
    size,
    coords,
    setCoords,
    setPlayerScores
  } = useAppContext()

  // const [tiles, setTiles] = useState(initTiles)
  useEffect(() => {
    const result = findConsecutiveSequences(tiles)
    if (result.sequences.length) {
      let coordinates: any = result.sequences.map(sequence => sequence.coordinates)
      coordinates = coordinates.flat()
      setCoords(coordinates)
    }

    const p1 = getScore(1, result.sequences)
    const p2 = getScore(2, result.sequences)

    setPlayerScores([p1, p2])

    if (isBoardFull()) {
      setIsGameOver(true)
      if (p1.score > p2.score) {
        setWinner(1)
      } else if (p1.score < p2.score) {
        setWinner(2)
      } else {
        setWinner(0)
        setIsDraw(true)
      }
    }

  }, [tiles])

  useEffect(() => {
    // console.log('coords changed', coords)
  }, [coords])

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

  const updateTilesValue = (row: number, col: number, newValue: number) => {
    setTiles((prevArray: Tiles) => {
      // Create a new copy of the 2D array
      const newArray = prevArray.map((innerArray) => [...innerArray]);

      // Set the new value at the specified position
      newArray[row][col] = newValue;

      return newArray;
    });
  };

  // Handle player click on tile
  const handleTileClick = (event: BaseSyntheticEvent) => {
    if (isGameOver) return;

    const { currentTarget } = event
    const [x, y] = currentTarget?.querySelector('input')?.value?.split(',')

    // Prevent player click on the already clicked tile
    if (tiles[x][y] != 0) return

    const nextTurn: number = (turn === 1) ? 2 : 1

    updateTilesValue(x, y, nextTurn)
    setTurn(nextTurn)
    setNextTurn((nextTurn === 1) ? 2 : 1)
  }


  return (
    <div
      id="board"
      className={`
        w-80 md:w-[70vh] h-80 md:h-[70vh] 
        grid gap-[0.2vh] p-[0.2vh] justify-center items-center
        rounded-lg bg-slate-500 transition-opacity duration-500
        ${size === 6 && 'grid-cols-6 md:gap-[0.4vh] md:p-[0.4vh]'}
        ${size === 7 && 'grid-cols-7 md:gap-[0.4vh] md:p-[0.4vh]'}
        ${size === 8 && 'grid-cols-8 md:gap-[0.4vh] md:p-[0.4vh]'}
        ${size === 9 && 'grid-cols-9 md:gap-[0.5vh] md:p-[0.5vh]'}
        ${size === 10 && 'grid-cols-10 md:gap-[0.5vh] md:p-[0.5vh]'}
      `}>
      {
        tiles.map((row, ri) => {
          return row.map((_, ci) => {
            const own = tiles[ri][ci]
            const position = [ri, ci].toString()
            return (
              <div key={`${ri}-${ci}`}
                className={`tile
                  bg-gray-800 w-auto rounded-[3.5rem] flex justify-center items-center overflow-clip
                  p-1 
                  border-4 border-slate-600
                  transition-colors duration-300
                  ${size === 6 && 'h-[6.4vh] md:h-[11vh] border-[1.2vh]'}
                  ${size === 7 && 'h-[5.4vh] md:h-[9.4vh] border-[1vh]'}
                  ${size === 8 && 'h-[4.8vh] md:h-[8.2vh] border-[0.8vh]'}
                  ${size === 9 && 'h-[4.2vh] md:h-[7vh] border-[0.6vh]'}
                  ${size === 10 && 'h-[3.8vh] md:h-[6.4vh]'}
                  ${own === 0 && 'bg-gray-900 hover:border-slate-200'}
                  ${own === 1 && 'bg-blue-900 border-blue-600'}
                  ${own === 2 && 'bg-red-900 border-red-600'}
                  ${nextTurn === 1 && own === 0 && 'hover:bg-blue-900 hover:blur-sm'}
                  ${nextTurn === 2 && own === 0 && 'hover:bg-red-900 hover:blur-sm'}
                  ${isGameOver && !isInCoords(position) && 'blur-sm contrast-50'}
                `}
                onClick={handleTileClick}
              >
                <span className="absolute text-white text-xs float-left">
                  {/* {position}
                  {isInCoords(position) ? ' in' : ' out'} */}
                </span>
                <input type="hidden" name="tileNumber" value={position} />
                <div className={`
                  w-3/4 h-3/4
                  rounded-[3rem]
                  transition-colors duration-200
                  ${own === 1 && 'bg-blue-500'}
                  ${own === 2 && 'bg-red-500'}
                `}>
                  <div className={`invisible`}>
                    {displayPlayer(own).own}
                  </div>
                </div>
              </div>
            )
          })
        })
      }
    </div >
  )
}