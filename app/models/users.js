/* eslint-disable brace-style */
/* eslint-disable camelcase */

// grab the mongoose module
var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
// and the plugins
// var findOrCreate = require('mongoose-findorcreate')

// define our user model
var userSchema = new mongoose.Schema({
  address: {type: String, unique: true },
  name: {type: String, unique: true }
},
  {
    timestamps: true
  }
)

// userSchema.plugin(findOrCreate)

var User = mongoose.model('User', userSchema)


// module.exports allows us to pass this to other files when it is called
module.exports = User

/* eslint-disable brace-style */
/* eslint-disable camelcase */
