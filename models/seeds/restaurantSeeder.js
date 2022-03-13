const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantSeeds = require('../../restaurant.json')

db.once('open', () => {
  restaurantSeeds.results.forEach(element => {
    Restaurant.create(
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