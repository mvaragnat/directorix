module.exports = function(app) {
  //public pages=============================================
  //root
  app.get('/', function(req, res) {
    res.render('home')
    console.log('root')
  })
}
