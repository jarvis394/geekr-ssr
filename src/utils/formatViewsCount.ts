import numberToWordsRu from 'number-to-words-ru'

const formatViewCount = (n: number) => {
  const count = n >= 1000 ? Math.ceil(n / 100) / 10 + 'К' : n
  const viewsText = numberToWordsRu
    .convert(n, {
      currency: {
        currencyNameCases: ['просмотр', 'просмотра', 'просмотров'],
        currencyNounGender: {
          integer: 0,
        },
      },
      showNumberParts: {
        integer: true,
        fractional: false,
      },
      convertNumbertToWords: {
        integer: true,
        fractional: false,
      },
    })
    .split(' ')
    .pop()

  return `${count} ${viewsText}`
}

export default formatViewCount
