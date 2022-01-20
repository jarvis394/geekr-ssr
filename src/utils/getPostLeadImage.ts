import { Article } from 'src/interfaces'
import getImagesFromText from './getImagesFromText'

export default (post: Article) => {
  if (post.leadData.imageUrl) return post.leadData.imageUrl

  const imageURLRegExResults = getImagesFromText(
    post.textHtml || post.leadData.textHtml
  )

  return imageURLRegExResults ? imageURLRegExResults[1] : null
}
