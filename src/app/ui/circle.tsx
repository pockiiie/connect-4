import { useAppContext } from "../lib/app-context"
import { displayPlayer } from "../lib/player-display"
export default function Circle({ baseClass, innerClass, player, showScore = false }:
  {
    baseClass: string,
    innerClass: string,
    player: number,
    showScore?: boolean,
  }
) {
  const { playerScores } = useAppContext();
  return (<>
    <div className={`${baseClass} flex justify-center items-center ${displayPlayer(player).bg}`}>
      <div className={`${innerClass} text-center font-bold ${displayPlayer(player).innerBg}`}>
        {showScore && playerScores[player - 1]?.score}
      </div>
    </div>
  </>)
}