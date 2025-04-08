import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = Date.now() + '-' + path.basename(file.originalname);
    cb(null, sanitizedFilename);
  },
});

// Middleware for handling file uploads using multer
const upload = multer({ storage })

export { upload }