const Notification = ({ message }) => {

    if (message === null) {
      return null
    }
  
    return (
      <div style={style}>
        {message}
      </div>
    )
}

const style = {
    color: 'blue',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

export { Notification }