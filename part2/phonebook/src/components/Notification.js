const Notification = ({message}) => {
    if (message.msg === null) {
      return null
    }
    if (message.type === "remove"){
        return (
        <div className={message.type}>
            {message.msg}
        </div>
        )
    }
    if (message.type === "add"){
        return (
        <div className={message.type}>
            {message.msg}
        </div>
        )
    }
  }

export default Notification