const path = require("path");
const mime = require("mime");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/users",
  filename: function (req, file, cb) {
    const id = req.params.id;
    let ext = path.extname(file.originalname);
    ext = ext.length > 1 ? ext : "." + mime.extension(file.mimetype);
    const avatar = id + "_imgPerfil" + ext;

    req.avatar = avatar;
    cb(null, avatar);
  },
});

const uploadAvatar = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 20 * 1024 * 1024, //2MB,
  }, 
  fileFilter: (req, file, cb) => {
    const filetype = /jpeg|jpg|png/;
    const mimetype = filetype.test(file.mimetype);
    const extname = filetype.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb({message: "El servidor solo acepta imagenes .jpg y .png"});
  },
}).single("avatar");

module.exports = uploadAvatar;
