const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.get('/:id', async (request, response) => {
  try
  {
    const blog = await Blog.findById(request.params.id)
    if(blog){
      response.json(blog)
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

blogsRouter.post('/', (request, response) => {
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
  blog
    .save()
    .then(result => {
      console.log(request.body)
      response.status(201).json(result)
    })
})

module.exports = blogsRouter