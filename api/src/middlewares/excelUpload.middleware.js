
import multer from 'multer';

export const excelUploadMiddleware = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Geçersiz dosya türü. Sadece Excel dosyası yüklenebilir.'));
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }).single("excel");
  