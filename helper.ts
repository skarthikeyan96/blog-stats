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

export const getMultiline = (text: string, x: string) => {
  const postName = wrap(text, { width: 80 }).split('\n')

  const multiLinePostName = postName.map(
    (post, index) =>
      `<tspan dy="${1.5 * index}em" dx="18" x="${x}"> ${post} </tspan>`
  )

  const svgString = `${multiLinePostName.join('')}`

  return text.length !== 0 ? svgString : 'NA'
}
