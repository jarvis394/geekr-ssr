import { Box, styled } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Header from 'src/components/blocks/Header'
import ArticleComment from 'src/components/blocks/ArticleComment'
import useSelector from 'src/hooks/useSelector'
import { FetchingState } from 'src/types'
import { useDispatch } from 'react-redux'
import { getArticleComments } from 'src/store/actions/article'

const Root = styled(Box)({
  width: '100%',
})

const Comments: NextPage = () => {
  const router = useRouter()
  const articleId = router.query.id
  const data = useSelector((store) => store.article.comments.data)
  const fetchingState = useSelector((store) => store.article.comments.state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (fetchingState === FetchingState.Idle) {
      dispatch(getArticleComments(Number(articleId)))
    }
  }, [articleId, dispatch, fetchingState])

  return (
    <Root>
      <Header hidePositionBar disableShrinking divider>
        Комментарии
      </Header>
      {fetchingState === FetchingState.Fetched &&
        data?.threads.map((e) => (
          <ArticleComment data={data.comments[e]} key={e} />
        ))}
    </Root>
  )
}

export default Comments
