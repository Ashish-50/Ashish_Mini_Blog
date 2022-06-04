const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurifier(new JSDOM().window);

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
});


module.exports = mongoose.model("Article",articleSchema);