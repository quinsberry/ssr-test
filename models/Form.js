const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: String,
  phone: String,
  age: String,
  photo: {
    data: Buffer,
    contentType: String
  },
  // resume: {
  //   type: Object
  // }
})

module.exports = model('Form', schema)