// src/SignUpLogin/ForgotPassword.tsx
import { Button, TextInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from '../Services/authService'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email) {
      toast.warning('Please enter your email')
      return
    }

    try {
      setLoading(true)
      await AuthService.forgotPassword({ email })
      
      toast.success('OTP has been sent to your email')
      navigate('/reset-password')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
      
      <p className="text-mine-shaft-400 text-sm mb-6">
        Enter your email address and we'll send you an OTP to reset your password.
      </p>

      <div className="space-y-4">
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter your email"
          leftSection={<IconAt size={16} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          classNames={{
            input: 'bg-mine-shaft-700 border-mine-shaft-600 text-mine-shaft-100',
            label: 'text-mine-shaft-300'
          }}
        />

        <Button 
          loading={loading} 
          onClick={handleSubmit}
          fullWidth
          className="mt-4 bg-bright-sun-400 hover:bg-bright-sun-500 text-mine-shaft-900"
        >
          Send OTP
        </Button>
      </div>

      <div className="text-center text-sm mt-6 text-mine-shaft-400">
        <a 
          onClick={() => navigate('/login')}
          className="text-bright-sun-400 hover:underline cursor-pointer"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}

export default ForgotPassword