const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connection  = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    }).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    });
}

module.exports = connection