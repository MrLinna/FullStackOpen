import { useQuery } from '@apollo/client'
import { ME, RECOMMENDED_FOR_ME } from '../queries'
const Recommend = ({ show }) => {
  const me = useQuery(ME)
  const recommends = useQuery(RECOMMENDED_FOR_ME)

  if (show) {
    recommends.refetch()
    me.refetch()
  }
  if (!show || !me.data || !recommends.data) {
    return null
  }

  if (me.loading || recommends.loading) {
    return <p>Loading...</p>
  }

  if (me.error || recommends.error) {
    return <p>Something went wrong</p>
  }

  const favoriteGenre = me?.data?.me?.favoriteGenre

  const books = recommends.data.recommendedForMe.filter((b) =>
    b.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre{' '}
      <strong>{favoriteGenre ? favoriteGenre : ''}</strong>
      {favoriteGenre !== null ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books
              .filter((book) => book.genres.indexOf(favoriteGenre) > -1)
              .map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Recommend
