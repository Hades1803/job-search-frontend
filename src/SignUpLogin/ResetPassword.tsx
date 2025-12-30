// src/SignUpLogin/ResetPassword.tsx
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconKey, IconMail } from '@tabler/icons-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '../Services/authService'

const ResetPassword: React.FC = () => {
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleReset = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      toast.warning('Please fill all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      await AuthService.resetPassword({
        otp,
        newPassword
      })
      
      toast.success('Password reset successfully! You can now login with your new password.')
      navigate('/login')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Reset password failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
      
      <p className="text-mine-shaft-400 text-sm mb-6">
        Enter the OTP sent to your email and your new password.
      </p>

      <div className="space-y-4">
        <TextInput
          withAsterisk
          label="OTP"
          placeholder="Enter 6-digit OTP"
          leftSection={<IconMail size={16} />}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          classNames={{
            input: 'bg-mine-shaft-700 border-mine-shaft-600 text-mine-shaft-100',
            label: 'text-mine-shaft-300'
          }}
        />

        <PasswordInput
          withAsterisk
          label="New Password"
          placeholder="Enter new password"
          leftSection={<IconKey size={16} />}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          classNames={{
            input: 'bg-mine-shaft-700 border-mine-shaft-600 text-mine-shaft-100',
            label: 'text-mine-shaft-300',
            innerInput: 'text-mine-shaft-100'
          }}
        />

        <PasswordInput
          withAsterisk
          label="Confirm New Password"
          placeholder="Confirm new password"
          leftSection={<IconKey size={16} />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          classNames={{
            input: 'bg-mine-shaft-700 border-mine-shaft-600 text-mine-shaft-100',
            label: 'text-mine-shaft-300',
            innerInput: 'text-mine-shaft-100'
          }}
        />

        <Button 
          loading={loading} 
          onClick={handleReset}
          fullWidth
          className="mt-4 bg-bright-sun-400 hover:bg-bright-sun-500 text-mine-shaft-900"
        >
          Reset Password
        </Button>
      </div>

      <div className="text-center text-sm mt-6 text-mine-shaft-400">
        <Link
          to="/forgot-password"
          className="text-bright-sun-400 hover:underline mr-3"
        >
          Resend OTP
        </Link>
        <span className="text-mine-shaft-600">•</span>
        <a 
          onClick={() => navigate('/login')}
          className="text-bright-sun-400 hover:underline ml-3 cursor-pointer"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}

export default ResetPassword