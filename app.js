const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const keywords = keyword.split(',') 
  const restaurants = []

  keywords.forEach((word) => {
    for (let restaurant of restaurantList.results)
      if (restaurant.name.toLowerCase().includes(word.toLowerCase()) || restaurant.category.toLowerCase().includes(word.toLowerCase()) && !restaurants.includes(restaurant)) {
        restaurants.push(restaurant)
      }
  })

  res.render('index', { restaurants: restaurants, keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})