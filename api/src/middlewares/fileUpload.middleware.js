import multer from 'multer';
import { uploadFile } from '../helpers/file.helper.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Geçersiz dosya türü. Sadece PDF, JPEG ve PNG dosyaları yüklenebilir.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const handleFileUpload = upload.single('file');

export const fileUploadMiddleware = async (req, res, next) => {
  handleFileUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Lütfen bir dosya yükleyin.' });
    }

    try {
      const fileName = await uploadFile(req.file);
      req.fileName = fileName;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Dosya yüklenirken bir hata oluştu.' });
    }
  });
};