const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantSeeds = require('../../restaurant.json')

db.once('open', () => {
  Restaurant.create(restaurantSeeds.results)
  console.log('Done!')
})