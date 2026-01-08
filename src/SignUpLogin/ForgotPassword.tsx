// src/SignUpLogin/ForgotPassword.tsx
import { IconAt, IconMailForward } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '../Services/authService'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email) {
      toast.warning('Please enter your email')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    try {
      await AuthService.forgotPassword({ email })
      sessionStorage.setItem('resetEmail', email) // Lưu email để dùng cho verify OTP
      toast.success('OTP has been sent to your email')
      navigate('/verify-otp')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-mine-shaft-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <IconAt className="w-5 h-5 text-mine-shaft-500" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your email address"
            className="w-full pl-12 pr-4 py-4 bg-mine-shaft-900 border border-mine-shaft-700 rounded-xl text-white placeholder-mine-shaft-500 focus:outline-none focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent transition-all duration-200"
          />
        </div>
        <p className="text-xs text-mine-shaft-500 mt-2">
          Enter the email address associated with your account
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 hover:from-bright-sun-500 hover:to-bright-sun-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending OTP...
          </>
        ) : (
          <>
            <IconMailForward className="w-5 h-5" />
            Send OTP
          </>
        )}
      </button>
    </div>
  )
}

export default ForgotPassword