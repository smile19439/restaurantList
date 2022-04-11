const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 新建
router.get('/create', (req, res) => {
  return res.render('create')
})

router.post('/create', (req, res) => {
  const userId = req.user._id
  if (!req.body.name) {
    req.body.errors = [{ message: '店名為必填欄位！' }]
    return res.render('create', req.body)
  }
  return Restaurant
    .create(Object.assign(req.body, { userId }))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 餐廳detail
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  if (!req.body.name) {
    req.flash('warning_msg', '店名為必填欄位！')
    return res.redirect(`/restaurants/${_id}/edit`)
  }
  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 刪除
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router