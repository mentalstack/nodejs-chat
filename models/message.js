var mongoose = require('./../config/mongoose.js');

// Schema defines how the user data will be stored in MongoDB
var messageSchema = new mongoose.Schema({
 createdDate: Date,
 content: String,
 sender: String,
 roomName: String,
 contacts: [String],
 type: {
    type: String,
    enum: ['Peronal', 'Group'],
    default: 'Peronal'
  },
});

module.exports = mongoose.model('Message', messageSchema);