const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')




beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(n => new Blog(n))
  await Promise.all(blogObjects.map(n => n.save()))
})

describe('get_blogs', () => {
  test('blogs are returned as json', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)
  })

  test('all blogs are returned', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(blogsInDatabase.length)
  })
})

describe('post_blogs', () => {
  test('a valid blog can be added ', async () => {

    const blogsBefore = await blogsInDb()

    const newBlog = {
      title: 'blogi',
      author: 'Jaska',
      url: 'http://joku.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()

    const title = blogsAfter.map(r => r.title)

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(title).toContain('blogi')
  })

  test('blog without likes ', async () => {
    const newBlog = new Blog({
      title: 'blogi',
      author: 'Jaska',
      url: 'http://joku.fi',
      _id: '5a422aa71b54a676234d1712',
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api
      .get('/api/blogs/5a422aa71b54a676234d1712')
    console.log(response.body)

    const likes = response.body.likes

    expect(likes).toBe(0)
  })

  test('blog without title', async () => {
    const newBlog = new Blog({
      author: 'Jaska',
      url: 'http://joku.fi',
    })

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter).toEqual(blogsBefore)
  })

  test('blog without url ', async () => {
    const newBlog = new Blog({
      title: 'blogi',
      author: 'Jaska',
    })

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter).toEqual(blogsBefore)
  })
})

describe('deletion of a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'deletedblogi',
      author: 'Jaska',
      url: 'http://joku.fi'
    })
    await addedBlog.save()
  })

  test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })
})

afterAll(() => {
  server.close()
})