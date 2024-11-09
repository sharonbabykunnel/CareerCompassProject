import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const ErrorScreen = () => {
    const error = useRouteError();
  return (
    <div className=' error-container'>
      <h1>Opps! Somthing went wrong.</h1>
      <p>{error.message || "An error occured."}</p>
      <Link to='/home'>Go to Home</Link>
    </div>
  )
}

export default ErrorScreen
