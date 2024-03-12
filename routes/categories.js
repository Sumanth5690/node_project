const router=require('express').Router()
const categories=require('../models/categories')




router.post('/',async(req,res)=>{
const newcat=new categories(req.body)
try {
    const savedcat=await newcat.save()
    res.status(200).json(savedcat)
} catch (error) {
 res.status(500).json(error)   
}
})

router.get('/',async(req,res)=>{
    const cats=await categories.find()
    res.status(200).json(cats)
})




module.exports=router