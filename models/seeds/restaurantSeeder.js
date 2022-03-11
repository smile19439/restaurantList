const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantSeeds = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error.')
})

db.once('open', () => {
  console.log('mongodb connected.')
  restaurantSeeds.results.forEach(element => {
    restaurant.create(
      {
        name: element.name,
        name_en: element.name_en,
        category: element.category,
        image: element.image,
        location: element.location,
        phone: element.phone,
        google_map: element.google_map,
        rating: element.rating,
        description: element.description
      }
    )
  });
  console.log('Done!')
})