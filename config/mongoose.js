var mongoose = require('mongoose');
var config = require('.././config/main');

mongoose.connect(config.database);

module.exports = mongoose;