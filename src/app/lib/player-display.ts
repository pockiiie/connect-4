type Player = {
  own: number;
  bg: string;
  innerBg: string;
  color: string;
}

export const displayPlayer = (own: number): Player => {
  let bg = ''
  let color = 'black'
  let innerBg = ''
  switch (own) {
    case 1:
      bg = 'bg-blue-800'
      innerBg = 'bg-blue-500'
      break;
    case 2:
      bg = 'bg-red-800'
      innerBg = 'bg-red-500'
      break;
    default:
      bg = ''
      color = 'black'
      innerBg = ''
  }

  return {
    own: own,
    bg: bg,
    innerBg: innerBg,
    color: color
  }
}