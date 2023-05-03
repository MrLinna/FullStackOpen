import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [booksToShow, setBooksToShow] = useState([])
  const [genres, setGenres] = useState([])
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    if (books.data) {
      const allBooks = books.data.allBooks
      setBooksToShow(allBooks)
      setAllBooks(allBooks)
      let allGenres = []
      allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (allGenres.indexOf(genre) === -1) {
            allGenres.push(genre)
          }
        })
      })
      allGenres.push('all genres')
      setGenres(allGenres)
    }
  }, [books])

  const setGenre = (genre) => {
    if (genre === 'all genres') {
      setBooksToShow(allBooks)
    } else {
      setBooksToShow(allBooks.filter((book) => book.genres.indexOf(genre) > -1))
    }
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
