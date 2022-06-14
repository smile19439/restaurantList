function getSortCondition(value) {
  let sortCondition = ''

  if (value === '2') {
    sortCondition = { name: 'desc' }

  } else if (value === '3') {
    sortCondition = { category: 'asc' }

  } else if (value === '4') {
    sortCondition = { category: 'desc' }

  } else if (value === '5') {
    sortCondition = { location: 'asc' }

  } else if (value === '6') {
    sortCondition = { location: 'desc' }

  } else {
    sortCondition = { name: 'asc' }

  }

  return sortCondition
}

module.exports = getSortCondition