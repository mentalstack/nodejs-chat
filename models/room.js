var mongoose = require('./../config/mongoose.js');

// Schema defines how the user data will be stored in MongoDB
var roomSchema = new mongoose.Schema({
    name: String,
    members: {String}
});

module.exports = mongoose.model('Room', roomSchema);