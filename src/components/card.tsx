import { handleMostCommentedString, mostReactedPost } from '../../helper'

const Card = (props: Card) => {
  const {
    bg_color,
    text_color,
    heading,
    currentTotalPosts,
    mostReactedCountString,
    title_color,
    mostCommentedPostString,
    mostUsedTags,
    mostReactedCountPostString,
    totalPost,
    no_posts_text,
    isHashnode,
  } = props

  const statsLogo = isHashnode
    ? `<svg width="70px" height="70px" viewBox="-50 -30 460 400" role="img" class="stats-card__logo"  xmlns="http://www.w3.org/2000/svg">
      <path fill="#${title_color}" fill-rule="evenodd" clip-rule="evenodd" d="M23.155 112.598c-30.873 30.874-30.873 80.93 0 111.804l89.443 89.443c30.874 30.873 80.93 30.873 111.804 0l89.443-89.443c30.873-30.874 30.873-80.93 0-111.804l-89.443-89.443c-30.874-30.873-80.93-30.873-111.804 0l-89.443 89.443zm184.476 95.033c21.612-21.611 21.612-56.651 0-78.262-21.611-21.612-56.651-21.612-78.262 0-21.612 21.611-21.612 56.651 0 78.262 21.611 21.612 56.651 21.612 78.262 0z"/>
      </svg>`
    : `<svg role="img" class="stats-card__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="50px" height="50px"><path fill="#${title_color}" d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"></path></svg>`
  if (no_posts_text) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="695px" height="100px">
      <foreignObject width="495px" height="100px">
      <div xmlns="http://www.w3.org/1999/xhtml">
      <div class="card">
      <style>
      .card {
      background-color: #${bg_color};
      color: #${text_color};
      }
      </style>
      <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 695 100' width='695px' height='100px'>
      <g>
      <rect x="0" y="0" width="695" height="265" fill="#${bg_color}"></rect>
      <text x="20" y="50" font-size="18" font-family="Verdana" fill="#${title_color}"> ${no_posts_text}</text>
      </g>
      </svg>
      </div>
      </div>
      </foreignObject>
      </svg>`
  }

  const height = isHashnode ? '240' : '320'
  const viewBox = isHashnode ? '0 0 600 240' : '0 0 600 320'

  //prettier-ignore
  return `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="600px" height="${height}px">
  <foreignObject width="600px" height="${height}px">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <div class="card">
        <style>
          .card {
      background-color: #${bg_color};
      color: #${text_color};
      }
      .stats-card__header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      }
      .stats-card__heading{
      font-size: 18px;
      color: #${title_color};
      font-family: Arial;
      font-weight: bold;
      }
      .stats-card__logo{
      padding-right: 10px;
      fill: #${title_color}
      }
        </style>
        <div class="card-details">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${viewBox}">
            <foreignObject width="600px" height="${height}px">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <div class="stats-card__header">
                  <p class="stats-card__heading">
                    ${heading}
                  </p>
                  ${statsLogo}
                </div>
              </div>
            </foreignObject>
            <g>
              <text x="20" y="100" font-size="14" font-family="Verdana" fill="#${text_color}">${totalPost}</text>
              <text x="20" y="125" font-size="14" font-family="Verdana" fill="#${text_color}">${currentTotalPosts}</text>
              <text x="20" y="155" font-size="14" font-family="Verdana" fill="#${text_color}">${mostReactedCountString}</text>
              <text x="20" y="185" font-family="Verdana" font-size="14" fill="#${text_color}"> ${mostUsedTags || ""} </text>
              ${mostReactedPost( text_color, mostReactedCountPostString, isHashnode)}
              ${handleMostCommentedString(text_color,mostCommentedPostString)}
            </g>
          </svg>
        </div>
      </div>
    </div>
  </foreignObject>
</svg>

  `
}

export default Card
