import { NextApiRequest, NextApiResponse } from 'next'
import generateSocialPreview from 'src/lib/generateSocialPreview'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, hub } = req.query
  if (!title || !hub)
    return res.status(400).json({
      error: true,
      message: 'No title or hub present in request query',
      statusCode: 400,
    })

  try {
    const coverStream = await generateSocialPreview({
      title,
      hub,
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Content-Control', 'public, max-age=31536000')

    coverStream.pipe(res)
  } catch (error) {
    res.statusCode = 500
    res.end((error as Error).message)
  }
}
