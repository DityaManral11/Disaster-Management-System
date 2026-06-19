export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function safeParseJSON(value, fallback = null) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
