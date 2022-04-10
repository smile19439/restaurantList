const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
const userPassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    isEquel: function (a, b) {
      return a === b
    }
  }
}))

app.set('view engine', 'handlebars')

app.use(session({
  secret: 'restaurantSecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

userPassport(app)
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})