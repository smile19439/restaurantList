const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'Production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const User = require('../../models/user')
const Restaurant = require('../restaurant')
const restaurantSeeds = require('../../restaurant.json')

const userSeeds = [{
  email: 'user1@example.com',
  password: '12345678',
  restaurants: [1, 2, 3]
}, {
  email: 'user2@example.com',
  password: '12345678',
  restaurants: [4, 5, 6]
}]

db.once('open', () => {
  return Promise.all(
    Array.from({ length: userSeeds.length }, (value, i) => {

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(userSeeds[i].password, salt))
        .then(hash => User.create({
          email: userSeeds[i].email,
          password: hash
        }))

        .then(user => {
          // 依種子資料restaurants陣列值取餐廳資料
          const myRestaurants = restaurantSeeds.results.filter(element => {
            return userSeeds[i].restaurants.includes(element.id)
          })

          const userId = user._id
          return Promise.all(
            Array.from(myRestaurants, (value) => {
              value.userId = userId  //在餐廳物件加入userId
              return Restaurant.create(value)
            }))
        })
    }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})