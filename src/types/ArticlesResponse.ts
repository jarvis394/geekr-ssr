import Article from './Article'

export default interface ArticlesResponse {
  pagesCount: number
  publicationRefs: Map<string, Article>
  publicationIds: string[]
}