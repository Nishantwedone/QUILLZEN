import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import {UserContext} from '../context/user.context'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const { setUser } = useContext(UserContext)

  const [error, setError] = useState('')
  const navigate = useNavigate()

  function submitHandler(e){
    e.preventDefault()
    // Dummy login logic for demonstration
    axios.post('/users/login',
         { email, password }
        ).then((res) => {
        console.log(res.data)

        localStorage.setItem('token', res.data.token)
        setUser(res.data.user) // Set user in context

    navigate('/')
  }).catch((err) => {
        console.error(err.response.data)
        setError('Registration failed. Please try again.')
    })
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign in to your account</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          {error && (
            <div className="bg-red-500 text-white text-sm rounded px-4 py-2 mb-2">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
            //   onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
               onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
            //   onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
