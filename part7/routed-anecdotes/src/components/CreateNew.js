import { useNavigate } from 'react-router-dom'
import  { useField } from '../hooks'

const CreateNew = (props) => {
  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    props.setNotification(`a new anecdote ${content.value} created`)
    setTimeout(() => {
      props.setNotification(null)
    }, 5000)
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content
        <input value={content.value} type={content.type} onChange={content.onChange}/>
        <br />
        author
        <input value={author.value} type={author.type} onChange={author.onChange}/>
        <br />
        url for more info
        <input value={info.value} type={info.type} onChange={info.onChange} />
        <br />
        <button>create</button>
        <button onClick={handleReset} >reset</button>
      </form>
    </div>
  )
}

export default CreateNew