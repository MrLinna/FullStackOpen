const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const blogs = helper.dummyTestBlogs

test('dummy returns one', () => {
  const result = listHelper.dummy()
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('the total sum of likes in all of the blog posts in list', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('the blog that has most likes', () => {
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('the author that has most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })
})

describe('most likes', () => {
  test('the author that has most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})