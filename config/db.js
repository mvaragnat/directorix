var mongoose = require('mongoose')    // database
mongoose.plugin(schema => { schema.options.usePushEach = true });
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test', options, function (err) {
  if (err) {
    console.log('MongoDB error')
    throw err
  }
})
