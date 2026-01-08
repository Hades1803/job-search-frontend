// src/SignUpLogin/ResetPassword.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IconEye, IconEyeOff, IconLock } from '@tabler/icons-react'
import AuthService from '../Services/authService'

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleReset = async () => {
    const otp = sessionStorage.getItem('verifiedOtp')
    if (!otp) {
      toast.error('OTP not found, please verify again')
      return
    }

    if (!newPassword || !confirmPassword) {
      toast.warning('Please fill all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    try {
      await AuthService.resetPassword({ otp: parseInt(otp), newPassword })
      toast.success('Password reset successfully!')
      sessionStorage.removeItem('verifiedOtp')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Reset password failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleReset()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-mine-shaft-300 mb-2">
          New Password
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <IconLock className="w-5 h-5 text-mine-shaft-500" />
          </div>
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter new password"
            className="w-full pl-12 pr-12 py-4 bg-mine-shaft-900 border border-mine-shaft-700 rounded-xl text-white placeholder-mine-shaft-500 focus:outline-none focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-mine-shaft-500 hover:text-mine-shaft-300 transition-colors"
          >
            {showNewPassword ? (
              <IconEyeOff className="w-5 h-5" />
            ) : (
              <IconEye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-mine-shaft-500 mt-2">
          Password must be at least 6 characters long
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-mine-shaft-300 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <IconLock className="w-5 h-5 text-mine-shaft-500" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Confirm your password"
            className="w-full pl-12 pr-12 py-4 bg-mine-shaft-900 border border-mine-shaft-700 rounded-xl text-white placeholder-mine-shaft-500 focus:outline-none focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-mine-shaft-500 hover:text-mine-shaft-300 transition-colors"
          >
            {showConfirmPassword ? (
              <IconEyeOff className="w-5 h-5" />
            ) : (
              <IconEye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleReset}
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 hover:from-bright-sun-500 hover:to-bright-sun-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Resetting Password...
          </div>
        ) : (
          'Reset Password'
        )}
      </button>

      <div className="p-4 bg-mine-shaft-900/50 rounded-xl border border-mine-shaft-700">
        <h4 className="text-sm font-semibold text-mine-shaft-300 mb-2">
          Password Requirements:
        </h4>
        <ul className="text-xs text-mine-shaft-500 space-y-1">
          <li className={`flex items-center ${newPassword.length >= 6 ? 'text-green-400' : ''}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${newPassword.length >= 6 ? 'bg-green-400' : 'bg-mine-shaft-600'}`} />
            At least 6 characters
          </li>
          <li className={`flex items-center ${newPassword === confirmPassword && newPassword ? 'text-green-400' : ''}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${newPassword === confirmPassword && newPassword ? 'bg-green-400' : 'bg-mine-shaft-600'}`} />
            Passwords must match
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ResetPassword