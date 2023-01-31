// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.query.username
  const params = { username, per_page: 1000 }
  const headers = { 'api-key': process.env.DEV_API_KEY as string }

  try {
    const articlesResponse = await axios.get(`https://dev.to/api/articles`, {
      params,
      headers,
    })

    const data = articlesResponse.data

    if (data.length !== 0) {
      const years = data.map((d: { published_at: string | number | Date }) => {
        return new Date(d.published_at).getFullYear()
      })

      const filtered = years.filter(
        (y: number, index: number) => years.indexOf(y) === index
      )

      // console.log(filtered)

      res.status(200).json(filtered)
    } else {
      res.status(204).json(data)
    }
  } catch (e) {
    console.error('something went wrong')
  }
}
