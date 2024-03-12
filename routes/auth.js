const router=require('express').Router()
const User=require('../models/usermodel')
const bcrypt=require('bcrypt')


//register




router.post('/register',async(req,res)=>{
  
   try {
    //genrate new password
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(req.body.password,salt)
     

    //create new user
    const newUser=new User({
    username:req.body.username,
    email:req.body.email,
    password:hashedpassword
   })

    //save user in mongodb and sending response to the user
    const user=await newUser.save();
    res.status(200).json(user)
   } catch (error) {
    console.log(error)
   }
})


//login 
router.post('/login',async(req,res)=>{
try {
    const user=await User.findOne({email:req.body.email})
    !user && res.status(404).send("user not found")
    const validpassword=await bcrypt.compare(req.body.password,user.password)
    !validpassword && res.status(404).send("wrong password")

    const {password,...others}=user
    res.status(200).json(others)

    res.status(200).json(user)
} catch (error) {
   res.status(500).json(error)
}
})

module.exports=router;