const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

export default upload;
