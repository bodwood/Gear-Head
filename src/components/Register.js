import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [firstName, setFirstName] = useState('')
 const [lastName, setLastName] = useState('')

   const handleSubmit = (e) => {
     e.preventDefault()
   }

  return (
    <>
      <form onSubmit={handleSubmit} className='register-form'>
        <label htmlfor='firstName'>First Name</label>
        <input
          className='input'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='First Name'
          id='firstName'
          name='firstName'
        />
        <label htmlfor='lastName'>Last Name</label>
        <input
          className='input'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Last Name'
          id='lastName'
          name='lastName'
        />
        <label htmlfor='email'>email</label>
        <input
          className='input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='janedoe@email.com'
          id='email'
          name='email'
        />
        <label htmlfor='password'>password</label>
        <input
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='*****'
          id='password'
          name='password'
        />
        <button type='submit'>Login</button>
      </form>
      <Link to='/login' className='links'>
        Already have an account? Login here.
      </Link>
    </>
  )
}
export default Register