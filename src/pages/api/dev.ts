// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import moment from 'moment'

import type { NextApiRequest, NextApiResponse } from 'next'
import themes from '../../themes'
import Card from '../../components/card'

type Index = { [key: string | number]: any }

const getCurrentYearPosts = (posts: Index, currentYear: string) => {
  return posts.filter((post: any) => {
    const publishedYear = moment(post.published_at).year()

    return publishedYear === parseInt(currentYear)
  })
}

const getMostCommentedBlog = (currentYearPosts: Index[]) => {
  if (currentYearPosts.length > 0) {
    const commentsArray = currentYearPosts.map((post) => post.comments_count)

    const maxCommentedBlogIndex = commentsArray.indexOf(
      Math.max(...commentsArray)
    )
    return {
      count: Math.max(...commentsArray),
      item: currentYearPosts[maxCommentedBlogIndex],
    }
  }

  return {
    count: 0,
    item: {
      title: '',
    },
  }
}

const getMostReactedBlog = (
  currentYearPosts: Index[]
): { count: number; item: Index } => {
  if (currentYearPosts.length > 0) {
    const reactionsArray = currentYearPosts.map(
      (post) => post.public_reactions_count
    )

    const maxReactedBlogIndex = reactionsArray.indexOf(
      Math.max(...reactionsArray)
    )
    return {
      count: Math.max(...reactionsArray),
      item: currentYearPosts[maxReactedBlogIndex],
    }
  }

  return {
    count: 0,
    item: {
      title: '',
    },
  }
}

const getThePreviousYearBlogs = (posts: Index, currentYear: any) => {
  return posts.filter((post: { published_at: moment.MomentInput }) => {
    const publishedYear = moment(post.published_at).year()
    const previousYear = parseInt(currentYear) - 1
    return publishedYear === previousYear
  })
}

const getMostUsedTags = (posts: any) => {
  const lookup: any = {}

  // get the tags from all the current year posts
  let tagsArray = []

  tagsArray = posts
    .map((post: { tag_list: any }) => {
      return post.tag_list
    })
    .flat()

  for (let i = 0; i < tagsArray.length; i++) {
    const tag: any = tagsArray[i]

    if (tag in lookup) {
      lookup[tag] = lookup[tag] + 1
    } else {
      lookup[tag] = 0
    }
  }

  // sort the lookup
  const sorted = Object.keys(lookup)
    .sort((key1, key2) => lookup[key2] - lookup[key1])
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: lookup[key],
      }),
      {}
    )

  const tags = Object.entries(sorted)
    .splice(0, 3)
    .map((item: any) => {
      return item[0]
    })
  return tags.join(',')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.query.username
  const currentYear: any = req.query.year
  const params = { username, per_page: 1000 }
  const headers = { 'api-key': process.env.DEV_API_KEY as string }
  const showBorder = req.query.show_border

  try {
    const articlesResponse = await axios.get(`https://dev.to/api/articles`, {
      params,
      headers,
    })

    const data = articlesResponse.data

    if (data && data.length !== 0) {
      const currentYearPosts =
        getCurrentYearPosts(data, currentYear).length === 0
          ? []
          : getCurrentYearPosts(data, currentYear)

      const mostReactedBlog = getMostReactedBlog(currentYearPosts)

      const renderHeading = `${data[0].user.name}'s year on Dev`

      const totalPostString = `💯 Total Posts : ${data.length}`
      const currentTotalPosts = `📊 No of posts ( ${currentYear} ): ${currentYearPosts.length}`
      const mostReactedCountString = `😃 Most Reactions: ${mostReactedBlog?.count}`
      const mostReactedCountPostString = `🔥 Most reacted post: ${mostReactedBlog?.item.title}`
      const mostCommentedPostString = `💡 Most commented post: ${
        getMostCommentedBlog(currentYearPosts).item.title
      }`

      const mostUsedTags = `#️⃣ Most used tags: ${getMostUsedTags(
        currentYearPosts
      )}`

      // @ts-ignore
      const theme = themes[req.query.theme || 'default']

      let props: any = {}

      if (currentYearPosts.length === 0) {
        // render a error response card
        props = {
          no_posts_text: `☹️ You have not written anything on this ${currentYear}`,
          title_color: theme.title_color,
          text_color: theme.text_color,
          bg_color: theme.bg_color,
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
          showBorder,
        }
      }
      const response = Card(props)

      res.setHeader('Content-Type', 'image/svg+xml')
      // res.setHeader(
      //   'Cache-Control',
      //   `max-age=${604800 / 2}, s-maxage=604800, stale-while-revalidate=86400`,
      // );
      res.send(response)
    } else {
      // @ts-ignore
      const theme = themes[req.query.theme || 'default']

      const errorResponse = Card({
        no_posts_text: `username might be wrong !!`,
        title_color: theme.title_color,
        text_color: theme.text_color,
        bg_color: theme.bg_color,
      })

      res.setHeader('Content-Type', 'image/svg+xml')
      // res.setHeader(
      //   'Cache-Control',
      //   `max-age=${604800 / 2}, s-maxage=604800, stale-while-revalidate=86400`,
      // );
      res.send(errorResponse)
    }
  } catch (error) {
    res.status(500).send('something went wrong')
  }
}
