function getSortCondition(value) {
  if (value === '2') {
    const sortCondition = JSON.stringify({ name: 'desc' })
    return sortCondition
  } else if (value === '3') {
    const sortCondition = JSON.stringify({ category: 'asc' })
    return sortCondition
  } else if (value === '4') {
    const sortCondition = JSON.stringify({ category: 'desc' })
    return sortCondition
  } else if (value === '5') {
    const sortCondition = JSON.stringify({ location: 'asc' })
    return sortCondition
  } else if (value === '6') {
    const sortCondition = JSON.stringify({ location: 'desc' })
    return sortCondition
  } else {
    const sortCondition = JSON.stringify({ name: 'asc' })
    return sortCondition
  }
}

module.exports = getSortCondition