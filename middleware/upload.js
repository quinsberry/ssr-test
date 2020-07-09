const util = require('util')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const config = require('config')

let storage = new GridFsStorage({
  url: config.get('mongoUriImages'),
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg']

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-stage1-${file.originalname}`
      return filename
    }

    return {
      bucketName: 'photos',
      filename: `${Date.now()}-stage1-${file.originalname}`,
    }
  },
})

let uploadFile = multer({ storage: storage }).single('file')
let uploadFilesMiddleware = util.promisify(uploadFile)
module.exports = uploadFilesMiddleware
