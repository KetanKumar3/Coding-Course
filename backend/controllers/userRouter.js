const express = require('express')
const router = express.Router()
const user = require('../models/userSchema.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.get('/',(req,res)=>{
    res.send('homepage')
})

const verifyToken = (req, res, next) => {
    // Check if the cookie exists
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

router.post('/sign-up',async (req,res)=>{
    console.log(req.body)
    const {name,email,password} = req.body

    const userExist = await user.findOne({email})

    if(userExist){
        return res.status(409).json({message:'user is exist'})
    }

    const hashPassword = await bcrypt.hash(password,12)

    const createUser = await user.create({
        name:name,
        email:email,
        password:hashPassword
    })

    

    if(createUser){
        const token = jwt.sign({ userId: createUser._id }, 'secret', { expiresIn: '1h' });
        console.log('token',token)
        res.cookie('auth_token',token)
        console.log('response auth token')
        return res.status(201).json({message:"user is created successfully"})
    }
})

router.post('/login',async (req,res)=>{
    console.log(req.body)
    const {email,password} = req.body

    const userExist = await user.findOne({email})
    console.log(userExist)

    if(!userExist){
        return res.status(409).json({message:'user is not exist'})
    }

    const comparePassword = await bcrypt.compare(password,userExist.password)



    if(userExist && comparePassword){
       const token = jwt.sign({ userId: userExist._id }, 'secret', { expiresIn: '1h' });
        console.log('token',token)
        res.cookie('auth_token',token)
        console.log('response auth token')
        return res.status(201).json({message:"user is login successfully"})
    }

})

router.post('/logout',async (req,res)=>{
    await res.clearCookie('auth_token')
    return res.json({message:"cookie clear"})
})

router.get('/paid-course-data', verifyToken, async (req, res) => {

    console.log(`Accessing paid course data for user: ${req.user.userId}`);
    const findName = await user.findOne({_id:req.user.userId})
    console.log('find',findName)
    res.status(200).json({
        message: "You have access to the paid course!",
        
        course: {
            userName : findName.name,
            title: "Advanced MERN Stack Development",
            content: "This course covers advanced topics in MongoDB, Express, React, and Node.js..."
        }
    });
});

module.exports = router