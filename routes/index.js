const express = require("express");
const routes = express.Router()
const blogController = require('../controllers/blogController')
const multer = require('multer')

let uploadCounter = 100000;
const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null, "uploads")
    },
    filename : (req,file,cb) => {
        uploadCounter++;
        let img = uploadCounter + "-" + file.originalname;
        cb(null, img);
    }
})


const imgUpload = multer({ storage: storage }).fields([
    { name: "thumb_img", maxCount: 1 },
    { name: "extra_img", maxCount: 3 },
  ]);



routes.get('/', blogController.viewBlog)
routes.get('/add', blogController.blogAdd)
routes.post('/addBlog', imgUpload,blogController.addBlog)
routes.get('/adminView', blogController.adminView)
routes.get('/deleteBlog', blogController.deleteBlog)
routes.get('/mainBlog', blogController.blogData)


module.exports = routes