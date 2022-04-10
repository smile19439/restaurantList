const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, ConfirmPassword } = req.body
  let errors = []

  if (!email || !password || !ConfirmPassword) {
    errors.push({ message: 'Email, password, confirm password 為必填欄位。' })
  }
  if (password !== ConfirmPassword) {
    errors.push({ message: '輸入的密碼與確認密碼不相符。' })
  }
  if (errors.length > 0) {
    return res.render('register', { errors, name, email, password, ConfirmPassword })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '輸入的email已被註冊過囉！' })
        return res.render('register', { errors, name, email, password, ConfirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(res.redirect('/users/login'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '您已成功登出')
  res.redirect('/users/login')
})

module.exports = router