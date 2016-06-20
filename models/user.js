var mongoose = require('./../config/mongoose.js');
var roomSchema = require('./room.js');

// Schema defines how the user data will be stored in MongoDB
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  },
  status: {
    type: String,
    enum: ['Available', 'Busy', 'Away'],
    default: 'Available'
  },
  connectionId: {
    type: String,
  },
  rooms: {
    type:[  String ],
    default: ['general']
  }
});

// Create method to compare password input to password saved in database
userSchema.methods.comparePassword = function(pw, cb) {
  if(pw == this.password){
      return cb(null, true);
  }
  else return cb(new Error('error'));
};

userSchema.methods.getAll = function() {
  var users
  if(pw == this.password){
      return cb(null, true);
  }
  
};

userSchema.methods.getUsersRooms = function(user) {
  var users
  if(pw == this.password){
      return cb(null, true);
  }
  
};


module.exports = mongoose.model('User', userSchema);