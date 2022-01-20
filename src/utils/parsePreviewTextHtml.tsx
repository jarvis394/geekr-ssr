const parsePreviewTextHtml = (html: string) => {
  const onlyTagsRegexp = /(<([^>]+)>)/gi
  const res = html.replace('<br>', ' ').replace(onlyTagsRegexp, '')

  return res
}

export default parsePreviewTextHtml
