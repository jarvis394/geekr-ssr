import { Article } from 'src/types'

export default (article: Article) => {
  if (!article) return null

  const { id, isCorporative } = article
  const companyAlias = article.hubs.find((e) => e.type === 'corporative')?.alias
  return isCorporative
    ? '/company/' + companyAlias + '/blog/' + id
    : '/article/' + id
}
