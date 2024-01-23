const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    thumb_img : {
        type : String,
        require : true
    },
    // category : {
    //     type : String,
    //     require : true
    // },
    description : {
        type : String,
        require : true
    },
    date : {
        type : String,
        require : true
    },
    author : {
        type : String,
        require : true
    },
    extra_img : {
        type : [String],
        require : true
    },
})

const blog = mongoose.model('blog',blogSchema)

module.exports = blog