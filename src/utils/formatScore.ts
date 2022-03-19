const formatScore = (n: number) => {
  const count = n > 0 ? '+' + n : n
  let state = 'netural'
  if (n > 0) state = 'positive'
  else if (n < 0) state = 'negative'
  return {
    number: count,
    state,
  }
}

export default formatScore
