const { Router } = require('express')
const upload = require('../middleware/upload')

const router = Router()

const Form = require('../models/Form')

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Stages page',
  })
})

router.get('/feedback/failed', (req, res) => {
  res.render('feedback-failed', {
    title: 'Sending failed',
  })
})

router.get('/feedback/success', (req, res) => {
  res.render('feedback-success', {
    title: 'Sending success',
  })
})

router.post('/form', async (req, res) => {
  console.log('req.body: ', req.body)
  console.log('req.file: ', req.file)

  // await upload(req, res)

  const test = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    file: req.body.file,
    resume: req.body.resume,
  }

  // console.log('req files: ', req.files)
  // console.log('test: ', test)

  const form = new Form({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    file: req.body.file,
    resume: req.body.resume,
  })

  console.log('form: ', form)

  // await form.save()
  res.redirect('/')
})

router.get('/all', async (req, res) => {
  Form.find({}, function (err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      })
    }

    res.status(200).json({
      success: true,
      data: doc,
    })
  })
})

router.get('/form/delete/:id', async (req, res) => {
  const id = req.params.id

  try {
    await Form.findOne({ _id: id })
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: 'FORM_NOT_FOUND',
    })
  }

  Form.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      })
    }

    res.json({
      success: true,
    })
  })
})

module.exports = router
