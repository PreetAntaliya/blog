const blogModel = require("../models/blogModel");
const fs = require("fs");

const blogAdd = (req, res) => {
  return res.render("addBlog");
};

const addBlog = async (req, res) => {
  try {
    let { title, description, author, date } = req.body;

    let createBlog = await blogModel.create({
      title,
      description,
      author,
      date,
      thumb_img: req.files["thumb_img"][0].path,
      extra_img: req.files["extra_img"].map((file) => file.path),
    });

    if (createBlog) {
      return res.redirect("/add");
    }
  } catch (err) {
    console.log(err);
    return res.status("Internal Server Error");
  }
};

const viewBlog = async (req, res) => {
  try {
    let record = await blogModel.find({});
    return res.render("index", { record });
  } catch (err) {
    console.log(err);
    return res.status("Internal Server Error");
  }
};

const adminView = async (req, res) => {
  try {
    let record = await blogModel.find({});
    let extra_img = record.map((blog) => blog.extra_img);
    return res.render("adminview", { record });
  } catch (err) {
    console.log(err);
    return res.status("Internal Server Error");
  }
};

const deleteBlog = async (req, res) => {
  try {
    let imgRecord = await blogModel.findById(req.query.id);
    const thumbImagePath = imgRecord.thumb_img;
    const extraImagePaths = imgRecord.extra_img;

    fs.unlinkSync(thumbImagePath);

    extraImagePaths.map((extraImagePath) => {
      fs.unlinkSync(extraImagePath);
    });
    let record = await blogModel.findByIdAndDelete(req.query.id);
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.send("internal Server err");
  }
};

const editData = async(req,res) => {
  try{
      let id =  req.query.id;
      let single = await UserModel.findById(id);
      return res.render('edit',{single});
  }catch(err){
      console.log(err);
      return false;
  }
}

const updateData = async(req,res) => {
  try{
      if(req.file){
          let old = await UserModel.findById(req.body.id);
          fs.unlinkSync(old.image);
          let up = await UserModel.findByIdAndUpdate(req.body.id,{
              name : req.body.name,
              phone : req.body.phone,
              image : req.file.path
          });
          if(up){
              console.log("record update");
              return res.redirect('/');
          }
      }else{
          let old = await UserModel.findById(req.body.id);
          let up = await UserModel.findByIdAndUpdate(req.body.id,{
              name : req.body.name,
              phone : req.body.phone,
              image : old.image
          });
          if(up){
              console.log("record update");
              return res.redirect('/');
          }
      }
  }catch(err){
      console.log(err);
      return false;
  }
}



const blogData = async (req, res) => {
  try {

    const blogId = req.query.id;
    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render("blogDetails", { blog });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  blogAdd,
  addBlog,
  viewBlog,
  adminView,
  deleteBlog,
  editData,
  updateData,
  blogData,
};
