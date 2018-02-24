
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user',{ name: 1, username: 1 })
  console.log(blogs.map(Blog.format))
  response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
  try
  {
    const blog = await Blog.findById(request.params.id)
    if(blog){
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try
  {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  try
  {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    let blog = new Blog(request.body)
    console.log('likes: ', blog.likes)
    if(blog.likes === undefined  ){
      blog.likes = 0
    }
    if(blog.title === undefined  ){
      return response.status(400).json({ error: 'missing title' })
    }
    if(blog.url === undefined  ){
      return response.status(400).json({ error: 'missing url' })
    }
    const user = await User.findById(decodedToken.id)
    if(user){
      console.log(user)
      blog.user = user._id
      await blog.save()
      user.blogs = user.blogs.concat(blog._id)
      await user.save()
    }
    else{
      await blog.save()
    }
    console.log(Blog.format(blog))
    response.status(201).json(Blog.format(blog))
  }
  catch(exception)
  {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }

})

blogsRouter.put('/:id',async (request, response) => {
  let blog = new Blog(request.body)
  console.log('likes: ', blog.likes)
  if(blog.likes === undefined  ){
    blog.likes = 0
  }
  if(blog.title === undefined  ){
    return response.status(400).json({ error: 'missing title' })
  }
  if(blog.url === undefined  ){
    return response.status(400).json({ error: 'missing url' })
  }
  try
  {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
    return response.json(Blog.format(blog))
  }
  catch(exception){
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter