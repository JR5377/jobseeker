const mongoose = require('mongoose')
const mySchema = new mongoose.Schema({
  name: String,
  age: Number,
  pdf: {
    data: Buffer,
    contentType: String
  }
}) 
const MyModel1 = new mongoose.model('MyModel1',mySchema);
module.exports = MyModel1;
