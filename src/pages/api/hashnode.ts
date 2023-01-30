// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import themes from '../../themes'
import Card from '../../components/card'

const getData = async (
  username: string,
  bigData: any,
  page: any
): Promise<any> => {
  console.log('calling', page)
  const query = `
  query myQuery($username: String!, $page: Int){
    user(username: $username) {
      publication {
        posts(page: $page) {
          title
          brief
          slug
          dateAdded
          totalReactions
          partOfPublication
        }
      }
    }
  }`

  const variables = {
    username,
    page: page,
  }

  const graphqlQuery = {
    query: query,
    variables: variables,
  }

  try {
    const response = await axios({
      url: `https://api.hashnode.com/`,
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      data: graphqlQuery,
    })

    if (response.data?.data?.user?.publication?.posts.length > 0) {
      bigData.push(response.data.data.user.publication.posts)

      page++
      await new Promise((resolve) => setTimeout(resolve, 200)) // setup a sleep depend your api request/second requirement.

      return await getData(username, bigData, page)
    }

    return console.info('Data fetch complete')
  } catch (e) {
    console.log('something went wrong')
  }
}

const getUserInfo = async (username: string) => {
  const query = `
  query myQuery($username: String!){
    user(username: $username) {
      name
      username,
      numPosts
   }
  }`

  const variables = {
    username,
  }

  const graphqlQuery = {
    query: query,
    variables: variables,
  }

  try {
    const response = await axios({
      url: `https://api.hashnode.com/`,
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      data: graphqlQuery,
    })

    return response.data
  } catch (e) {
    console.log('something went wrong')
  }
}

const getCurrentYearPosts = (posts: any, currentYear: any) => {
  return posts.filter((post: any) => {
    const publishedYear = moment(post.dateAdded).year()

    return publishedYear === parseInt(currentYear)
  })
}

const getMostReactedBlog = (
  currentYearPosts: any
): { count: number; item: any } => {
  if (currentYearPosts.length > 0) {
    const reactionsArray = currentYearPosts.map(
      (post: { totalReactions: any }) => post.totalReactions
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
    const currentYearPost = getCurrentYearPosts(articles, currentYear)

    const mostReactedBlog = getMostReactedBlog(currentYearPost)

    const renderHeading = `${user.name}'s year on Hashnode`
    const totalPostString = `💯 Total Posts : ${user.numPosts}`

    const currentTotalPosts = `📊 No of posts ( ${currentYear} ): ${currentYearPost.length}`
    const mostReactedCountString = `😃 Most Reactions: ${mostReactedBlog?.count}`
    const mostReactedCountPostString = `🔥 Most reacted post: ${mostReactedBlog?.item.title}`

    // @ts-ignore
    const theme = themes[req.query.theme || 'default']

    let props: any = {}

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
