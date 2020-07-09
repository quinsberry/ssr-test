const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  age: String,
  file: String,
  resume: {
    required: true,
    type: String,
  },
})

module.exports = model('Form', schema)
