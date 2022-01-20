import Article from './Article'

export default interface ArticlesResponse {
  pagesCount: number
  articleRefs: Map<string, Article>
  articleIds: string[]
}