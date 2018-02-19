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

//https://www.consolelog.io/group-by-in-javascript/ mukaeltuna
Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    var found = groups.find(function(item) {
      return item.author === val
    })
    if(found===undefined){
      groups.push({ 'author':item.author, 'blogs':1 })
    }
    else{
      found.blogs++
    }
    return groups
  }, [])
}

Array.prototype.groupBySumLikes = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    var found = groups.find(function(item) {
      return item.author === val
    })
    if(found===undefined){
      groups.push({ 'author':item.author, 'likes':item.likes })
    }
    else{
      found.likes += item.likes
    }
    return groups
  }, [])
}

const mostBlogs = (blogs) => {
  const groupedBlogs = blogs.groupBy('author')
  console.log(groupedBlogs)
  const maxi =  Math.max(...groupedBlogs.map(blog => blog.blogs))
  console.log('suurin',maxi)
  return blogs.length === 0 ? {} : groupedBlogs.filter(blog => blog.blogs === maxi)[0]
}

const mostLikes = (blogs) => {
  const groupedBlogs = blogs.groupBySumLikes('author')
  console.log(groupedBlogs)
  const maxi =  Math.max(...groupedBlogs.map(blog => blog.likes))
  console.log('suurin',maxi)
  return blogs.length === 0 ? {} : groupedBlogs.filter(blog => blog.likes === maxi)[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}