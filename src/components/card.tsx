import { getMultiline } from '../../helper'

const Card = (props: any) => {
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
    showBorder,
  } = props

  const borderColor =
    showBorder === 'true' ? '5px solid #99E6B3' : 'transparent'
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

  return `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="600px" height="320px">
  <foreignObject width="600px" height="320px">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <div class="card">
        <style>
          .card {
            background-color: #${bg_color};
            color: #${text_color};
            border: ${borderColor}
          }
         .stats-card__header{
          display: flex;
          justify-content: space-between;
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
        <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 600 320'>
        <foreignObject width="600px" height="320px">
        <div xmlns="http://www.w3.org/1999/xhtml">
        <div class="stats-card__header"> 
        <p class="stats-card__heading"> ${heading}</p>
        
        <svg role="img" class="stats-card__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="50px" height="50px"><path fill="#${title_color}" d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"></path></svg>
        </div>
        </div>
        </foreignObject>
         
        
        <g>

         
         
        
            <text x="20" y="100" font-size="14" font-family="Verdana" fill="#${text_color}">${totalPost}</text>
            <text x="20" y="125" font-size="14" font-family="Verdana" fill="#${text_color}">${currentTotalPosts}</text>
            <text x="20" y="155" font-size="14" font-family="Verdana" fill="#${text_color}">${mostReactedCountString}</text>
            <text x="20" y="185" font-family="Verdana" font-size="14" fill="#${text_color}">${getMultiline(
    mostReactedCountPostString,
    '0'
  )} </text>
            <text x="20" y="235" font-family="Verdana" font-size="14" fill="#${text_color}"> ${mostUsedTags} </text>
            <text x="20" y="265" font-family="Verdana" font-size="14" fill="#${text_color}">${getMultiline(
    mostCommentedPostString,
    '0'
  )} </text>
          </g>
        </svg>

        </div>


      </div>

    </div>
  </foreignObject>
</svg>`
}

export default Card