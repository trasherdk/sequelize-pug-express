/*
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

module.exports.post = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('register', {
      errors: errors.array()
    })
  } else {
    User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    req.flash('success', 'New User Created')
    res.redirect('/')
    User.findAll({}).then(users => {
      console.log(users)
    })
  }
}
*/
