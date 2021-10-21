import Article from './Article'

export default interface ArticlesResponse {
  pagesCount: number
  articleRefs: Map<number, Article>
  articleIds: number[]
}