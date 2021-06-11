const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        fileType(file, cb)
    }
}).single('image')

function fileType (file, cb) {
    const fileTypes = /jpeg|jpg|png/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if (extName && mimeType) {
        return cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = {upload}