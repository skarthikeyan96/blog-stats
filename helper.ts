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
