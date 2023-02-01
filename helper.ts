import axios from 'axios'
import moment from 'moment'
import wrap from 'word-wrap'

export const getYears = () => {
  const endYear = new Date().getFullYear()
  const years = []
  let startYear = new Date().getFullYear() - 10
  while (startYear <= endYear) {
    years.push(startYear++)
  }
  return years
}

export const getMultiline = (width: number, text: string, x: string) => {
  const postName = wrap(text, { width }).split('\n')

  if (postName.length > 1) {
    const multiLinePostName = postName.map(
      (post, index) =>
        `<tspan dy="${1.5 * index}em" dx="18" x="${x}"> ${post.trim()} </tspan>`
    )

    const svgString = `${multiLinePostName.join('')}`

    return text.length !== 0 ? svgString : 'NA'
  }

  return text.length !== 0 ? `<tspan> ${postName[0].trim()} </tspan>` : 'NA'
}

export const getData = async (
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

export const getUserInfo = async (username: string) => {
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

export const getCurrentYearHashnodePosts = (posts: any, currentYear: any) => {
  return posts.filter((post: any) => {
    const publishedYear = moment(post.dateAdded).year()

    return publishedYear === parseInt(currentYear)
  })
}

export const getMostReactedHashnodePost = (
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

export const getCurrentYearDevPosts = (posts: any, currentYear: string) => {
  return posts.filter((post: any) => {
    const publishedYear = moment(post.published_at).year()

    return publishedYear === parseInt(currentYear)
  })
}

export const getMostCommentedDevPost = (currentYearPosts: any[]) => {
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

export const getMostReactedDevPost = (
  currentYearPosts: any[]
): { count: number; item: any } => {
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

export const getMostUsedTags = (posts: any) => {
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

export const handleMostCommentedString = (
  text_color: string,
  mostCommentedPostString?: string
) => {
  if (mostCommentedPostString) {
    const post = wrap(mostCommentedPostString, {
      width: 80,
    }).split('\n')

    // if it has only one element
    if (post.length === 1) {
      return `<text x="20" y="255" font-family="Verdana" font-size="14" fill="#${text_color}"> ${post[0].trim()} </text>
       `
    }

    return `<text x="20" y="265" font-family="Verdana" font-size="14" fill="#${text_color}"> ${getMultiline(
      80,
      mostCommentedPostString,
      '0'
    )} </text>
    `
  }
  return ''
}

export const mostReactedPost = (
  text_color: string,
  mostReactedCountPostString: string,
  isHashnode?: boolean
) => {
  if (isHashnode) {
    return ` <text
        x="20"
        y="185"
        font-family="Verdana"
        font-size="14"
        fill="#${text_color}"
      >
        ${getMultiline(60, mostReactedCountPostString, '0')}
      </text>`
  }

  return ` <text
  x="20"
  y="215"
  font-family="Verdana"
  font-size="14"
  fill="#${text_color}"
>
  ${getMultiline(80, mostReactedCountPostString, '0')}
</text>`
}
