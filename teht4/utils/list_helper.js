const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.map(blog => blog.likes).reduce((a,b) => {return a + b})
}

const favoriteBlog = (blogs) => {
  const maxi =  Math.max(...blogs.map(blog => blog.likes))
  console.log('suurin',maxi)
  return blogs.length === 0 ? {} : blogs.filter(blog => blog.likes === maxi)[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}