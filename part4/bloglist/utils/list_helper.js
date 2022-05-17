const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

  return {
    title: maxLikes.title,
    author: maxLikes.author,
    likes: maxLikes.likes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}