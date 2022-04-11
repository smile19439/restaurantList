module.exports = {
  // 登入驗證
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    return res.redirect('/users/login')
  }
}