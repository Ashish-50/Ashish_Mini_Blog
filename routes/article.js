const { request } = require('express');
const express = require('express');
const router = express.Router();
const Article = require('../model/blog_schema');
const Subscribe = require('../model/subscribe');



router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()});
});


router.get('/edit/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id);
    res.render('articles/edit',{article:article});
});


router.get('/:id',async(req,res)=>{
    const article =await Article.findById(req.params.id);
    if(article ==null) res.redirect('/')
    res.render('articles/show',{article:article})
});



router.post('/',async(req,res)=>{
    let article = new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    });
    try {
        article = await article.save();  
        res.redirect(`/articles/${article.id}`)
    } catch (error) {
        console.log(error)
        res.render('articles/new',{article:article})
    }
}); 


router.delete('/:id',async(req,res)=>{
    try {
        const deletedata = await Article.findByIdAndDelete(req.params.id)
        res.redirect('/')
    } catch (error) {
        console.log({
            error:error,
            message:"Error from delete "
        })
    }
});



router.put('/:id',async(req,res)=>{
    try {
        let article = await Article.findByIdAndUpdate(req.params.id,{
            $set:{
                title:req.body.title,
                description:req.body.description,
                markdown:req.body.markdown,
            }
        });
        res.redirect(`/articles/${article.id}`)

    } catch (error) {
        console.log(error)
        res.render('articles/edit',{article:article})
    }
});


//subscribe
router.post('/subscribe',async(req,res)=>{
    const subdetail = new Subscribe({
        email:req.body.email
    });
    try {
        const savedetail = subdetail.save();
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
    
});


module.exports = router;