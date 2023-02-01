// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import themes from '../../themes'
import Card from '../../components/card'
import {
  getUserInfo,
  getData,
  getCurrentYearHashnodePosts,
  getMostReactedHashnodePost,
} from '../../../helper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username: any = req.query.username || 'imkarthikeyans'
  const currentYear = req.query.year || '2022'
  const articleResponse: any = []
  const page = 0

  const {
    data: { user },
  } = await getUserInfo(username)

  await getData(username, articleResponse, page)

  if (articleResponse?.length !== 0) {
    const articles = articleResponse.flat()
    const currentYearPost = getCurrentYearHashnodePosts(articles, currentYear)
    const mostReactedBlog = getMostReactedHashnodePost(currentYearPost)
    const renderHeading = `${user.name}'s year on Hashnode`
    const totalPostString = `💯 Total Posts : ${user.numPosts}`
    const currentTotalPosts = `📊 No of posts ( ${currentYear} ): ${currentYearPost.length}`
    const mostReactedCountString = `😃 Most Reactions: ${mostReactedBlog?.count}`
    const mostReactedCountPostString = `🔥 Most reacted post: ${mostReactedBlog?.item.title}`

    // @ts-ignore
    const theme = themes[req.query.theme || 'default']

    let props: Card = {
      text_color: '',
      mostReactedCountPostString: '',
    }

    props = {
      heading: renderHeading,
      totalPost: totalPostString,
      currentTotalPosts,
      mostReactedCountString,
      mostReactedCountPostString,
      title_color: theme.title_color,
      text_color: theme.text_color,
      bg_color: theme.bg_color,
      border_color: theme.border_color,
      isHashnode: true,
    }

    const response = Card(props)

    res.setHeader('Content-Type', 'image/svg+xml')

    res.send(response)
  } else {
    res.status(200).json({ data: [] })
  }
}
