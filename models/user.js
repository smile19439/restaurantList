const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)