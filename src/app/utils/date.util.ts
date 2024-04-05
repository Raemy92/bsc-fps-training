export const formatDate = (date: Date, includeTime: boolean): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
    options.hour12 = false
  }

  return date.toLocaleDateString('de-CH', options)
}

export const convertStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('.')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}
