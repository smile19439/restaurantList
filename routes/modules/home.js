const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const { getSortCondition } = require('../../helpers/restaurant-helpers')

// 總覽
router.get('/', (req, res, next) => {
  const sortValue = req.query.sort
  const filterValue = req.query.filter
  const sortCondition = getSortCondition(sortValue)
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort(sortCondition)
    .then(restaurants => {
      // 取得所有餐廳的類別
      let categories = [...new Set(restaurants.map(({ category }) => category))]
        .sort((a, b) => {
          if (a < b) {
            return -1
          }
          if (a > b) {
            return 1
          }
          return 0
        })
        .map(element => ({ category: element }))

      if (filterValue && filterValue !== '所有類別') {
        restaurants = restaurants.filter(element => element.category === filterValue)
        const index = categories.findIndex(element => element.category === filterValue)
        categories[index].isSelected = true
      }
      return res.render('index', { restaurants, sortValue, categories, filterValue })
    })
    .catch(error => next(error))
})

// 查詢
router.get('/search', (req, res, next) => {
  const keyword = req.query.keyword.trim()
  // 合併查詢條件
  const conditions = keyword.split(',')
    .reduce((acc, cur) => {
      return acc.concat([
        { name: { $regex: cur, $options: 'i' } },
        { category: { $regex: cur, $options: 'i' } }
      ])
    }, [])

  Restaurant.find({ $or: conditions })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => next(error))
})

module.exports = router