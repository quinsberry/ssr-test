const { Router } = require('express')
const fs = require('fs')


const router = Router()


const Form = require('../models/Form')

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Stages page'
  })
})

router.get('/stage1', (req, res) => {
  res.render('stage1', {
    title: 'Stage1 page'
  })
})

router.post('/stage1', async (req, res) => {
  const form = new Form({
    name: req.body.name,
    phone: req.body.phone,
    age: req.body.age,
    photo: req.body.photo,
    // resume: req.body.resume,
  })

  // form.img.data = fs.readFileSync(req.files.userPhoto.path)
  // form.img.contentType = 'image/png';
  console.log(form)

  await form.save()
  res.redirect('/')
})

router.get('/stage2', (req, res) => {
  res.render('stage2', {
    title: 'Stage2 page'
  })
})

module.exports = router