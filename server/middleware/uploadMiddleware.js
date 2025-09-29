import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (extName) cb(null, true);
  else cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
};

// Multer upload
const upload = multer({
  storage,
  limits: { fileSize: process.env.UPLOAD_MAX_SIZE || 5242880 },
  fileFilter,
});

export default upload;
