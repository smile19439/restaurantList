const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

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
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})