import { Article } from 'src/types'
import getImagesFromText from './getImagesFromText'

export default (aricle: Article) => {
  if (aricle.leadData.imageUrl) return aricle.leadData.imageUrl

  const imageURLRegExResults = getImagesFromText(
    aricle.textHtml || aricle.leadData.textHtml
  )

  return imageURLRegExResults ? imageURLRegExResults[1] : null
}
