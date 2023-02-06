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

const favouriteBlog = (blogs) => {
  let favourite = blogs.reduce((mostLikes, blog) => mostLikes.likes > blog.likes ? mostLikes : blog)
  return (
    {
      'title': favourite.title,
      'author': favourite.author,
      'likes': favourite.likes
    }
  )
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}