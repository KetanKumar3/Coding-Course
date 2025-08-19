const mongoose = require('mongoose')

const dbConnect = () => {
mongoose.connect('mongodb://127.0.0.1:27017/codingcourse')
.then(()=>console.log('database is connected'))
.catch(()=>console.log('database is not connected'))
}


module.exports = dbConnect