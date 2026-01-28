import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";



const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    // Tentukan folder berdasarkan jenis file
    let dest = 'storage/private/others'; // default
    
    if (file.fieldname === 'foto') {
      dest = 'storage/private/photos';
    } else if (file.fieldname === 'cv') {
      dest = 'storage/private/documents';
    }

    // Buat folder jika belum ada
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    cb(null, dest);
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    // Gunakan timestamp + nama asli agar nama file unik
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter agar hanya file tertentu yang bisa masuk
const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (file.fieldname === 'foto') {
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Hanya boleh upload gambar!'), false);
  } else if (file.fieldname === 'cv') {
    file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('CV harus format PDF!'), false);
  }
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // Batas 2MB
});