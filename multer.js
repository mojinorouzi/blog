var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    // var ext = path.extension(file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});


module.exports = upload;
