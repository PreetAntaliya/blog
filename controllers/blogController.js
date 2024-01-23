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

const editData = async (req, res) => {
  try {
    let id = req.query.id;
    let single = await blogModel.findById(id);
    return res.render("edit", { single });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateData = async (req, res) => {
  try {
    const { title, description, date, author } = req.body;
    const id = req.body.editId;

    // Check if thumb_img file exists
    if (req.files && req.files['thumb_img'] && req.files['thumb_img'].length > 0) {
      const oldData = await blogModel.findById(id);

      // Delete old thumb_img file
      fs.unlinkSync(oldData.thumb_img);

      const updatedBlog = await blogModel.findByIdAndUpdate(id, {
        title,
        thumb_img: req.files['thumb_img'][0].path,
        description,
        date,
        author,
      });

      if (updatedBlog) {
        console.log("Blog record updated with new thumb_img");
        return res.redirect("/");
      }
    } else {
      // Handle the case when no new thumb_img is uploaded
      const updatedBlog = await blogModel.findByIdAndUpdate(id, {
        title,
        description,
        date,
        author,
      });

      if (updatedBlog) {
        console.log("Blog record updated without changing thumb_img");
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};


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
