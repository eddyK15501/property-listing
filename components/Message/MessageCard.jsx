import React from 'react'

const MessageCard = ({ message }) => {
  return (
    <h3>{message.body}</h3>
  )
}

export default MessageCard