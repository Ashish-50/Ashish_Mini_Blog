const express = require("express");
const app = express();
const ejs = require('ejs');
const Article = require('./model/blog_schema')
const dotenv = require('dotenv').config();
const connection = require('./model/conn')
const methodoverride = require('method-override');
//Routers
const articleRouter = require('./routes/article')

//setting engine
app.set('view engine','ejs');


//setting middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodoverride('_method'));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*"); //access-control-allow-origin means it will allow by the browser and * means anyone can access
    res.header('Access-Control-Allow-Header','Origin,X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});

//routes
app.use('/articles',articleRouter);

app.get("/",async(req,res)=>{
    const articles =await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{articles:articles})
});


app.use((req,res,next)=>{  // if client is not resolved by any above routes then this route handle that
    const error = new Error('Not Found');
    error.status=404;
    next(error);  // here next will pass the error to next middle ware
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})
app.listen(process.env.PORT || 8000,()=>{
    console.log(`server started at port ${process.env.PORT}`);
    connection();
});