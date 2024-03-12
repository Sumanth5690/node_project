const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const { default: helmet } = require('helmet');
dotenv.config();

const morgan = require('morgan');

const authroutes=require('./routes/auth')
const user=require('./routes/userroutes')
const post=require('./routes/post')
const categories=require('./routes/categories')




app.use(express.json())
app.use(helmet())
app.use(morgan("comman"))

app.use('/api/auth',authroutes)
app.use('/api/users',user)
app.use('/api/posts',post)
app.use('/api/category',categories)





mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connection succesfull")).catch((error)=>{console.log(error)})

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
