const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const getSortCondition = require('./models/sortCondition')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    isEquel: function (a, b) {
      return a === b
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const sortValue = req.query.sort
  const sortCondition = JSON.parse(getSortCondition(sortValue))
  Restaurant.find()
    .lean()
    .sort(sortCondition)
    .then(restaurants => res.render('index', { restaurants, sortValue }))
    .catch(error => console.log(error))
})

app.get('/create', (req, res) => {
  return res.render('create')
})

app.post('/new', (req, res) => {
  const { name, name_en, category, location, google_map, rating, phone, image, description } = req.body
  return Restaurant.create({ name, name_en, category, location, google_map, rating, phone, image, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const { name, name_en, category, location, google_map, rating, phone, image, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.phone = phone
      restaurant.image = image
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})