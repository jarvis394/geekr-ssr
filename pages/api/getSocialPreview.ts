import { NextApiRequest, NextApiResponse } from 'next'
import nodeHtmlToImage from 'node-html-to-image'
import socialPreviewHTML from 'src/config/socialPreviewHTML'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, hubs } = req.query
  if (!title || !hubs) return res.status(400).json({
    error: true,
    message: 'No title or hubs present in request query',
    statusCode: 400
  })

  const image = await nodeHtmlToImage({
    html: socialPreviewHTML(title as string, hubs as string),
  })
  return res.end(image)
}
