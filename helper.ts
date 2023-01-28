export const getYears = () => {
  const endYear = new Date().getFullYear()
  const years = []
  let startYear = new Date().getFullYear() - 10
  while (startYear <= endYear) {
    years.push(startYear++)
  }
  return years
}
