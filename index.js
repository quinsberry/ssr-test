const express = require('express')
const mongoose = require('mongoose')
const exphbr = require('express-handlebars')
const multer = require('multer')

const path = require('path')

const stagesRouter = require('./routes/stages')

const PORT = process.env.PORT || 4000

const app = express()
const hbs = exphbr.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

// for server rendering
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

//for req.body
app.use(express.urlencoded({ extended: true }))

// for css
app.use(express.static(path.join(__dirname, 'public')))

app.use(stagesRouter)

async function start() {
  try {
    await mongoose.connect('mongodb+srv://username:123pass@cluster0-spiep.mongodb.net/stages', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
  } catch (e) {
    console.log(e)
  }
}

app.listen(PORT, err => {
  if (err) {
    throw Error(err)
  }

  console.log('Server has been started..')
})

start()
