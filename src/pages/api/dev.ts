// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import themes from '../../themes'
import Card from '../../components/card'
import {
  getCurrentYearDevPosts,
  getMostCommentedDevPost,
  getMostReactedDevPost,
  getMostUsedTags,
} from '../../../helper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.query.username
  const currentYear = req.query.year as string
  const params = { username, per_page: 1000 }
  const headers = { 'api-key': process.env.DEV_API_KEY as string }

  try {
    const articlesResponse = await axios.get(`https://dev.to/api/articles`, {
      params,
      headers,
    })

    const data = articlesResponse.data
    if (data && data.length !== 0) {
      const currentYearPosts =
        getCurrentYearDevPosts(data, currentYear).length === 0
          ? []
          : getCurrentYearDevPosts(data, currentYear)

      const mostReactedBlog = getMostReactedDevPost(currentYearPosts)
      const renderHeading = `${data[0].user.name}'s year on Dev`
      const totalPostString = `💯 Total Posts : ${data.length}`
      const currentTotalPosts = `📊 No of posts ( ${currentYear} ): ${currentYearPosts.length}`
      const mostReactedCountString = `😃 Most Reactions: ${mostReactedBlog?.count}`
      const mostReactedCountPostString = `🔥 Most reacted post: ${mostReactedBlog?.item.title}`
      const mostCommentedPostString = `💡 Most commented post: ${getMostCommentedDevPost(currentYearPosts).item.title
        }`
      const mostUsedTags = `#️⃣ Most used tags: ${getMostUsedTags(
        currentYearPosts
      )}`

      // @ts-ignore
      const theme = themes[req.query.theme || 'default']
      let props: Card = {
        text_color: '',
        mostReactedCountPostString: '',
      }

      if (currentYearPosts.length === 0) {
        // render a error response card
        props = {
          no_posts_text: `☹️ You have not written anything on this ${currentYear}`,
          title_color: theme.title_color,
          text_color: theme.text_color,
          bg_color: theme.bg_color,
          mostReactedCountPostString: '',
        }
      } else {
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
          mostCommentedPostString,
          mostUsedTags,
        }
      }
      const response = Card(props)

      res.setHeader('Content-Type', 'image/svg+xml')
      res.send(response)
    } else {
      // @ts-ignore
      const theme = themes[req.query.theme || 'default']
      const errorResponse = Card({
        no_posts_text: `username might be wrong !!`,
        title_color: theme.title_color,
        text_color: theme.text_color,
        bg_color: theme.bg_color,
        mostReactedCountPostString: '',
      })

      res.setHeader('Content-Type', 'image/svg+xml')
      res.send(errorResponse)
    }
  } catch (error) {
    res.status(500).send('something went wrong')
  }
}
