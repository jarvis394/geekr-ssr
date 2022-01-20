/**
 * Gets images' sources from given HTML string
 */
export default (html: string) => {
  const imageURLRegEx = /<img[^>]+src="?([^"\s]+)"?\s*/g
  return imageURLRegEx.exec(html)
}
