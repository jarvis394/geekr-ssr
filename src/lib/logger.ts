export const info = (...props: unknown[]) => {
  console.log(
    '%c[info] %c' + props.map(e => e?.toString()).join(' '),
    'color: #2979ff;',
    'color: #dddddd;'
  )
}

export const error = (...props: unknown[]) => {
  console.log(
    '%c[error] %c' + props.map(e => e?.toString()).join(' '),
    'color: #f44336;',
    'color: #f3f3f3;'
  )
}