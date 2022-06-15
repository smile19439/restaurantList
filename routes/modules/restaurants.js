const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const { getRestaurantData } = require('../../helpers/restaurant-helpers')
// 新建
router.get('/create', (req, res) => {
  return res.render('create')
})

router.post('/create', (req, res, next) => {
  const userId = req.user._id
  const restaurant = getRestaurantData(req.body)

  if (!restaurant.name) {
    restaurant.errors = [{ message: '店名為必填欄位！' }]
    return res.render('create', restaurant)
  }
  return Restaurant
    .create(Object.assign(restaurant, { userId }))
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})

// 餐廳detail
router.get('/:restaurant_id', (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => next(error))
})

// 編輯
router.get('/:restaurant_id/edit', (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => next(error))
})

router.put('/:restaurant_id', (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  if (!req.body.name) {
    const errors = [{ message: '店名為必填欄位！' }]
    restaurant = getRestaurantData(req.body)
    restaurant._id = _id
    return res.render('edit', { restaurant, errors })
  }
  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, getRestaurantData(req.body))
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => next(error))
})

// 刪除
router.delete('/:restaurant_id', (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})

module.exports = router