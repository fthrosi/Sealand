import multer from "multer";
import path from "path";
import { Request } from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..","..");

//set storage engine
const applicantStorage = multer.diskStorage({
  destination: (req : Request, file : Express.Multer.File, cb: Function) => {
    cb(null, path.join(rootDir, "uploads/applicant/"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,'applicant-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const galleryStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(rootDir, "uploads/gallery/"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,'gallery-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const licenseStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(rootDir, "uploads/license/"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,'license-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const portfolioStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(rootDir, "uploads/portfolio/"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,'portfolio-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const teamStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(rootDir, "uploads/team/"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,'team-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const vesselTypeStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(rootDir, "uploads/vesselType/"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,'vesselType-' + uniqueSuffix + path.extname(file.originalname));
  }
});





//init uploads
export const uploadApplicantImage = multer({ 
    storage: applicantStorage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
});

export const uploadGalleryImage = multer({ 
    storage: galleryStorage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
});


export const uploadLicenseImage = multer({ 
    storage: licenseStorage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
});

export const uploadPortfolioImage = multer({ 
    storage: portfolioStorage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
});
export const uploadTeamImage = multer({ 
    storage: teamStorage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
});

export const uploadVesselTypeImage = multer({ 
    storage: vesselTypeStorage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
});