import formatWordByNumber from './formatWordByNumber'

const formatNumber = (n: number, words?: [string, string, string]) => {
  const count = n >= 1000 ? Math.ceil(n / 100) / 10 + 'К' : n
  if (!words) return count

  const text = formatWordByNumber(n, words)
  return `${count} ${n >= 1000 ? words[words.length - 1] : text}`
}

export default formatNumber
