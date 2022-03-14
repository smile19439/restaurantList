function getSortCondition(value) {
  let sortCondition = ''

  if (value === '2') {
    sortCondition = JSON.stringify({ name: 'desc' })

  } else if (value === '3') {
    sortCondition = JSON.stringify({ category: 'asc' })

  } else if (value === '4') {
    sortCondition = JSON.stringify({ category: 'desc' })

  } else if (value === '5') {
    sortCondition = JSON.stringify({ location: 'asc' })

  } else if (value === '6') {
    sortCondition = JSON.stringify({ location: 'desc' })

  } else {
    sortCondition = JSON.stringify({ name: 'asc' })

  }

  return sortCondition
}

module.exports = getSortCondition