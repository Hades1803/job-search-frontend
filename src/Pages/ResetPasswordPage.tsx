// src/pages/ResetPasswordPage.tsx
import React from 'react'
import { IconLock, IconArrowLeft } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import ResetPassword from '../SignUpLogin/ResetPassword'

const ResetPasswordPage: React.FC = () => {
  const location = useLocation()
  const otp = (location.state as any)?.otp || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-mine-shaft-950 to-mine-shaft-900 font-['poppins'] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/forgot-password"
          className="inline-flex items-center gap-2 text-mine-shaft-300 hover:text-bright-sun-400 mb-8 transition-colors duration-200"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Forgot Password</span>
        </Link>

        <div className="bg-mine-shaft-800/50 backdrop-blur-sm rounded-3xl border border-mine-shaft-700 shadow-2xl p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-bright-sun-400/20 to-bright-sun-500/10 mb-4">
              <IconLock className="w-10 h-10 text-bright-sun-400" stroke={2} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-mine-shaft-400">Create a new secure password for your account</p>
          </div>

          <ResetPassword />

          <div className="text-center pt-6 mt-6 border-t border-mine-shaft-700">
            <p className="text-mine-shaft-400">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-bright-sun-400 hover:text-bright-sun-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage