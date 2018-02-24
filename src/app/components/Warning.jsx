import React from 'react'

const Warning = ({message}) => {
  return (
    <div className='alert alert-danger' role='alert'>
      {message}
    </div>
  )
}

export default Warning
