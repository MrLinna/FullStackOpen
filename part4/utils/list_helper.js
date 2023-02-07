const dummy = () => 1

const totalLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  }
  else if (blogs.length === 1) {
    return blogs[0].likes
  }
  else{
    const likes = ( blogs ) => {
      return blogs.map(blog => blog.likes)

    }
    const reducer = (sum, item) => {
      return sum + item
    }
    return likes(blogs).reduce(reducer, 0)
  }
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const favourite = blogs.reduce((mostLikes, blog) => {
    return (mostLikes.likes > blog.likes
      ? mostLikes
      : blog
    )
  })
  return (
    {
      'title': favourite.title,
      'author': favourite.author,
      'likes': favourite.likes
    }
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const authorBlogs = []
  blogs.forEach(blog => {
    //const index = authorBlogs.findIndex(blog.author)
    const index = authorBlogs.findIndex(e => e.author === blog.author)
    const NotInList = index === -1 ? true : false
    if(NotInList){
      authorBlogs.push({ 'author': blog.author, 'blogs':1 })
    }
    else{
      authorBlogs[index].blogs +=1
    }
  })
  const mostBlogs = authorBlogs.reduce((most, item) => {
    return item.blogs > most.blogs
      ? item
      : most
  })
  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const authorLikes = []
  blogs.forEach(blog => {
    const index = authorLikes.findIndex(e => e.author === blog.author)
    const NotInList = index === -1 ? true : false
    if(NotInList){
      authorLikes.push({ 'author': blog.author, 'likes': blog.likes })
    }
    else{
      authorLikes[index].likes += blog.likes
    }
  })

  const mostLikes = authorLikes.reduce((most, item) => {
    return item.likes > most.likes
      ? item
      : most
  })

  return mostLikes
}



module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}