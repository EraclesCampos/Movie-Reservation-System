import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/posters")
  },
  filename: (req, file, cb) => {
    // Si ya existe una imagen y no se quiere cambiar, usar el nombre existente
    if (req.body.existingImage && !req.file) {
      cb(null, req.body.existingImage)
    } else {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  }
})

// Middleware simple para manejar la imagen
export const handleMovieImage = (req, res, next) => {
  // Si no se subio un archivo, mantener la imagen existente
  if (!req.file && req.body.existingImage) {
    req.body.poster = req.body.existingImage
  } else if (req.file) {
    req.body.poster = req.file.filename
  }
  
  next()
}

export const file = multer({ storage })