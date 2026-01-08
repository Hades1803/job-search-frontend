// src/pages/Login.tsx
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { toast } from 'react-toastify'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setLoading(true)
      await login(email, password)
      toast.success('Login successful!')
      navigate('/')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-1/2 px-20 flex flex-col justify-center gap-3'>
      <div className='text-2xl font-semibold'>Login</div>

      <TextInput
        withAsterisk
        leftSection={<IconAt size={16} />}
        label="Your email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      
      <div className="text-right text-sm">
        <Link
          to="/forgot-password"
          className="text-bright-sun-400 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button loading={loading} onClick={handleLogin}>
        Login
      </Button>

      <div className='mx-auto'>
        Don't have an account ?{' '}
        <Link to="/signup" className='text-bright-sun-400 hover:underline'>
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default Login