const fs = require('fs');
const multer = require('multer');
const path = require('path');
const ApiError = require('../utilities/ApiError');
const debugUpload = require('debug')('app:upload');

module.exports = function createUploader({
  field = 'image',
  folder = './uploads',
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxSize = 5 * 1024 * 1024
} = {}) {

  // Ensure upload folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  // Storage setup
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const safeName = file.originalname.replace(/\s+/g, '_');
      const unique = `${Date.now()}-${safeName}`;
      cb(null, unique);
    }
  });

  // File validation
  function fileFilter(req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(ApiError.badRequest('Invalid file type uploaded'), false);
    }
    cb(null, true);
  }

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize }
  });

  // Post-processing middleware
  const postProcessor = (req, res, next) => {
    // IMPORTANT: if no file was uploaded, skip silently
    if (!req.file) {
      debugUpload('No file uploaded — skipping uploader');
      return next();
    }

    try {
      const BASE = process.env.BASE_URL;
      const fullpath =
        `${BASE.replace(/\/$/, '')}/${req.file.path.replace(/^\//, '')}`;

      req.fileUrl = fullpath;
      debugUpload('File uploaded:', fullpath);

      next();
    } catch (error) {
      next(ApiError.internal('Image could not be uploaded', error));
    }
  };

  return [upload.single(field), postProcessor];
}
