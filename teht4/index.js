const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
  })


app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.error)


if (process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  mongoose
    .connect(process.env.MONGODB_URI)
    .then( () => { 
      console.log('connected to database', process.env.MONGODB_URI) 
    })
    .catch( err => { 
      console.log(err) 
    })  


mongoose.Promise = global.Promise


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})