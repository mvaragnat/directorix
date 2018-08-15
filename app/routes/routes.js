/* eslint-disable brace-style */
/* eslint-disable camelcase */

const User = require('../models/users')
const Radix = require('../../config/radix')

module.exports = function(app) {
  //public pages=============================================
  //root
  app.get('/', function(req, res) {
    console.log('root')

    // do we need to register each time ? is there a token to store?
    if ( req.session.token ) {
      console.log('token in session')
      displayHome(req.session.token, res)

    }
    else {
      Radix.register()
        .then(connection => {
          console.log('registered', connection.token)//, connection)
          req.session.token = connection.token
          displayHome(req.session.token, res)
        })
        .catch(error => {
          console.log('Error while registering your app:', error.message + ' code ' + error.code);
          res.render('home', { error: error.message + ' code ' + error.code })
        });
    }
  })

  var displayHome = function(token, res) {
    Radix.getAddress(token, (error, address) => {
      console.log('check if user exists')
      User.findOne({ address }, function(err, user){
        if (err) {
          console.log('error', error)
          res.render('home', { error })
        }
        else {
          console.log('user', user)
          res.render('home', { user, address, error })
        }
      })
    })
  }

  app.post('/register', function(req, res) {
    console.log('register')
    if ( req.session.token ) {
      console.log('name', req.body.name)
      Radix.getAddress(req.session.token, (error, address) => {
        console.log('check if user exists')
        User.findOne({ address }, function(err, user){
          if (err) {
            console.log('error', error)
            res.redirect('/')
          }
          else if (user) {
            console.log('user already exists !', user)
            res.redirect('/')
          }
          else {
            var u = new User({ address, name: req.body.name })
            u.save(function (error) {
              if (err) {
                console.log('error', error)
                res.redirect('/')
              }
              else {
                res.redirect('/')
              }
            })
          }
        })
      })
    }
    else {
      throw new Error('Token missing')
    }
  })
}
