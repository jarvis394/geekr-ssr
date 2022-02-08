import { Box, Skeleton } from '@mui/material'
import React, { useMemo } from 'react'
import random from 'src/utils/random'

const getLines = (linesCount: number): number[][] => {
  const res = new Array(linesCount).fill(null)
  for (let i = 0; i < linesCount; i++) {
    const lineLength = random(3, 5)
    const line = new Array(lineLength).fill(null)
    let percentageLeft = 100
    for (let j = 0; j < lineLength; j++) {
      const basePercentage = percentageLeft / (lineLength - j)
      const percentage = Math.floor(
        random(basePercentage - 10, basePercentage + 10)
      )
      percentageLeft -= percentage
      line[j] = percentage
    }
    res[i] = line
  }
  return res
}

const Text: React.FC<{ lines?: number }> = ({ lines: linesCount = 5 }) => {
  const lines = useMemo(() => getLines(linesCount), [linesCount])

  return (
    <>
      {lines.map((line, i) => (
        <Box key={i} sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          {line.map((width, j) => (
            <Skeleton
              key={j}
              variant="text"
              width={width.toString() + '%'}
              height={21.5}
            />
          ))}
        </Box>
      ))}
    </>
  )
}

export default Text
