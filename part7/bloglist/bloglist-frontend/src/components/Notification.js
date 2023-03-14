import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }
  const style = {
    color: notification.color,
    background: 'white',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div
      className={
        notification.color === 'red'
          ? 'notification__error'
          : 'notification__success'
      }
      style={style}
    >
      {notification.message}
    </div>
  )
}

export default Notification
