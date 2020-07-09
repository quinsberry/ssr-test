const express = require('express')
const mongoose = require('mongoose')
const exphbr = require('express-handlebars')
const multer = require('multer')
const config = require('config')

const path = require('path')

const stagesRouter = require('./routes/stages')

const PORT = config.get('port') || 5000

const app = express()
const hbs = exphbr.create({
  defaultLayout: 'main',
  extname: 'hbs',
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
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    app.listen(PORT, (err) => {
      if (err) {
        throw Error(err)
      }

      console.log(`Server has been started on port:${PORT} ...`)
    })
  } catch (e) {
    console.log('Server errors: ', e)
  }
}

start()
