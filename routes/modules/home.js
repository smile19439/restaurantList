const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const getSortCondition = require('../../models/sortCondition')

router.get('/', (req, res) => {
  const sortValue = req.query.sort
  const sortCondition = JSON.parse(getSortCondition(sortValue))
  Restaurant.find()
    .lean()
    .sort(sortCondition)
    .then(restaurants => res.render('index', { restaurants, sortValue }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const keywords = keyword.split(',')
  let conditions = []

  keywords.forEach((word) => {
    conditions = conditions.concat([
      { name: { $regex: word, $options: 'i' } },
      { category: { $regex: word, $options: 'i' } }
    ])
  })

  Restaurant.find({ $or: conditions })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

module.exports = router