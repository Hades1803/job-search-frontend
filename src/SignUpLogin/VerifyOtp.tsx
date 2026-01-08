// src/SignUpLogin/VerifyOtp.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IconMail, IconKey } from '@tabler/icons-react'
import AuthService from '../Services/authService'

interface VerifyOtpProps {
  email: string
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ email }) => {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleVerify = async () => {
    if (!otp) {
      toast.warning('Please enter OTP')
      return
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error('OTP must be 6 digits')
      return
    }

    setIsLoading(true)
    try {
      await AuthService.verifyOtp({ otp: parseInt(otp) })
      sessionStorage.setItem('verifiedOtp', otp)
      toast.success('OTP verified successfully')
      navigate('/reset-password')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify()
    }
  }

  const handleResend = async () => {
    try {
      // Gọi API resend OTP nếu có
      // await AuthService.resendOtp({ email })
      toast.info('OTP resent successfully')
    } catch (err) {
      toast.error('Failed to resend OTP')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-bright-sun-400/20 to-bright-sun-500/10 mb-4">
          <IconKey className="w-8 h-8 text-bright-sun-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">Verify OTP</h3>
        <p className="text-mine-shaft-400 text-sm mt-1">
          Enter the 6-digit code sent to {email || 'your email'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-mine-shaft-300 mb-2">
          6-Digit OTP
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <IconMail className="w-5 h-5 text-mine-shaft-500" />
          </div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            onKeyPress={handleKeyPress}
            placeholder="Enter 6-digit code"
            className="w-full pl-12 pr-4 py-4 bg-mine-shaft-900 border border-mine-shaft-700 rounded-xl text-white placeholder-mine-shaft-500 focus:outline-none focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent text-center text-xl tracking-widest transition-all duration-200"
            maxLength={6}
          />
        </div>
        <p className="text-xs text-mine-shaft-500 mt-2">
          Enter the verification code sent to your email
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleVerify}
          disabled={isLoading || otp.length !== 6}
          className="flex-1 py-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 hover:from-bright-sun-500 hover:to-bright-sun-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </div>
          ) : (
            'Verify OTP'
          )}
        </button>

        <button
          onClick={handleResend}
          className="px-6 py-4 border border-mine-shaft-700 text-mine-shaft-300 hover:text-white hover:border-mine-shaft-600 font-medium rounded-xl transition-all duration-200 hover:bg-mine-shaft-800/50"
        >
          Resend
        </button>
      </div>

      <div className="p-4 bg-mine-shaft-900/50 rounded-xl border border-mine-shaft-700">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-bright-sun-400 mr-3"></div>
          </div>
          <div>
            <p className="text-sm text-mine-shaft-300">
              <span className="font-semibold">Note:</span> This OTP will expire after 10 minutes. Keep this window open while verifying.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp