const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/user')

// 登入
router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: true,
  failureRedirect: '/users/login'
}))

// 註冊
router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res, next) => {
  const { name, email, password, ConfirmPassword } = req.body
  let errors = []

  // 判斷錯誤訊息
  if (!email || !password || !ConfirmPassword) {
    errors.push({ message: 'Email, password, confirm password 為必填欄位。' })
  }
  if (password !== ConfirmPassword) {
    errors.push({ message: '輸入的密碼與確認密碼不相符。' })
  }
  if (errors.length > 0) {
    return res.render('register', { errors, name, email, password, ConfirmPassword })
  }

  // 確認有無建立過資料
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
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

// 登出
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '您已成功登出')
  res.redirect('/users/login')
})

module.exports = router