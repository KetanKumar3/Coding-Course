const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/userRouter.js')
const cookieParser = require('cookie-parser')

const dbConnect = require('./db/dbConnect.js')
dbConnect()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())


app.use(userRouter)


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`backend server is running on ${PORT}`)
})