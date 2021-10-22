import React from 'react'
import { Article } from 'src/interfaces'

const ArticleItem: React.FC<{ data: Article }> = ({ data }) => {
  return <div>{data.author.alias} - {data.titleHtml}</div>
}

export default React.memo(ArticleItem)
