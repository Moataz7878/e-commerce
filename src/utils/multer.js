import multer from "multer";
export const validation_Array = {
  image: ["image/png", "image/jpeg"],
  files: ["application/pdf"],
};
function fileUploud(customValidation =validation_Array.image){
  try {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
      if (customValidation.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb("In_vaild",false);
      }}
    const upload = multer({  fileFilter, storage })
      return upload
  } catch (error) {
    console.log(error);
     res.json({message:'fail catch'});
  }
}
export {fileUploud}
