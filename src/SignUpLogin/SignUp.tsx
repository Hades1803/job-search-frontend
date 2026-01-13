import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
  Group
} from '@mantine/core'
import {
  IconAt,
  IconLock,
  IconUser,
  IconBriefcase
} from '@tabler/icons-react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type RoleId = '102' | '103'

const SignUp: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [roleId, setRoleId] = useState<RoleId | null>(null)
  const [accepted, setAccepted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!roleId) {
      toast.error('Please select your role')
      return
    }

    if (!email || !password || !confirmPassword) {
      toast.error('Please fill all required fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!accepted) {
      toast.error('You must accept terms & conditions')
      return
    }

    try {
      setLoading(true)

      await axios.post('https://job-search-backend-bcgv.onrender.com/api/auth/register', {
        email,
        password,
        roleId
      })

      toast.success('Account created successfully')

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Register failed'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>



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

      <PasswordInput
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Confirm Password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

       <Group grow>
        <Button
          color="brightSun"
          variant={roleId === '102' ? 'filled' : 'outline'}
          leftSection={<IconUser size={16} />}
          onClick={() => setRoleId('102')}
        >
          Candidate
        </Button>

        <Button
          color="brightSun"
          variant={roleId === '103' ? 'filled' : 'outline'}
          leftSection={<IconBriefcase size={16} />}
          onClick={() => setRoleId('103')}
        >
          Employer
        </Button>
      </Group>

      <Checkbox
        checked={accepted}
        onChange={(e) => setAccepted(e.currentTarget.checked)}
        label={
          <>
            I accept{' '}
            <Anchor component="button">terms & conditions</Anchor>
          </>
        }
      />
            {/* 🔹 Select Role */}
     

      <Button
        autoContrast
        variant="filled"
        loading={loading}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>

      <div className="mx-auto">
        Have an account?{' '}
        <Link
          to="/login"
          className="text-bright-sun-400 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default SignUp
