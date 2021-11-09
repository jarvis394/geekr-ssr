import { useRouter } from 'next/router'
import React from 'react'

const Article = () => {
  const router = useRouter()
  const articleId = router.query.id

  return (
    <div>
      {articleId}
    </div>
  )
}

export default Article
