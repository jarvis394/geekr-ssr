import numberToWordsRu from 'number-to-words-ru'

const formatWordByNumber = (n: number, words: [string, string, string]) => {
  const res = numberToWordsRu.convert(n, {
    currency: {
      currencyNameCases: words,
      currencyNounGender: {
        integer: 0,
      },
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    },
  })

  return res.split(' ').slice(1)
}

export default formatWordByNumber
