const express = require('express')
const router = express.Router()
const user = require('../models/userSchema.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.get('/',(req,res)=>{
    res.send('homepage')
})

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

router.post('/logout',async (req,res)=>{
    await res.clearCookie('auth_token')
    return res.json({message:"cookie clear"})
})

module.exports = router