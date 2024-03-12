const router=require('express').Router()
const User=require('../models/usermodel')

const post=require('../models/post')
const { query } = require('express')

//create post
router.post('/',async(req,res)=>{
 const newpost=new post(req.body)
 try {
    const savedpost=await newpost.save()
    res.status(200).json(savedpost)
 } catch (error) {
    res.status(500).json(error)
 }
})



//update post

router.put('/:id',async(req,res)=>{
   try {
    const Post=await post.findById(req.params.id) 
     if(Post.username===req.body.username){
        
   

   try {
    const updatedpost=await post.findByIdAndUpdate(req.params.id,{
        $set:req.body},{new:true})
        res.status(200).json(updatedpost)
   } catch (error) {
    res.status(500).json(error) 
   } 
}else{
     res.status(500).json("you can update only your post")
}
   } catch (error) {
    res.status(500).json(error)   }
  })



//delete post 
router.delete('/:id',async(req,res)=>{
  try {
   const Post=await post.findById(req.params.id) 
    if(Post.username===req.body.username){
       
  

  try {
       await post.findByIdAndDelete(req.params.id)
       res.status(200).json("post has been deleted")
  } catch (error) {
   res.status(500).json(error) 
  } 
}else{
    res.status(401).json("you can delete only your post")
}
  } catch (error) {
   res.status(500).json(error)   }
 })


 //get post
 
 router.get('/:id',async(req,res)=>{
  try {
    const Post=await post.findById(req.params.id)
  
    res.status(200).json(Post)
  } catch (error) {
    res.status(500).json(error)
  }
 })

 //get all posts
 
 router.get('/',async(req,res)=>{
  const username=req.query.user;
  const catname=req.query.cat;
  try {
    let posts;
   if(username){
    posts=await post.find({username })
   }else if(catname){
    posts=await post.find({categories:{
      $in:[catname]
    }})
   }else{
    posts=await post.find()
   }
   res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error)
  }
 })



module.exports=router;