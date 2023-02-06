const dummy = () => 1

const totalLikes = (blogs) => {
  const likes = ( blogs ) => {
    return blogs.map(blog => blog.likes)

  }
  const reducer = (sum, item) => {
    return sum + item
  }
  return likes(blogs).reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}
