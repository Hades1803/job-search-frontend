// src/pages/ResetPasswordPage.tsx
import React from 'react'
import { IconAnchor, IconLock, IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ResetPassword from '../SignUpLogin/ResetPassword'

const ResetPasswordPage: React.FC = () => {
  return (
    <div className='min-h-[100vh] bg-mine-shaft-950 font-["poppins"] overflow-hidden'>
      <div className="relative w-full h-[100vh] flex">
        {/* Left side - Form */}
        <div className="w-1/2 h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Link 
              to="/forgot-password" 
              className="inline-flex items-center gap-2 text-mine-shaft-400 hover:text-bright-sun-400 transition-colors mb-8"
            >
              <IconArrowLeft className="w-5 h-5" />
              Back to Forgot Password
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-bright-sun-400/10">
                <IconLock className="w-8 h-8 text-bright-sun-400" stroke={2} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-mine-shaft-100">Reset Password</h1>
                <p className="text-mine-shaft-400">Enter OTP and new password</p>
              </div>
            </div>

            <div className="bg-mine-shaft-800 rounded-2xl p-8 mb-6">
              <ResetPassword />
            </div>

            <div className="text-center text-sm text-mine-shaft-400">
              <p>Remember your password? <Link to="/login" className="text-bright-sun-400 hover:underline font-medium">Sign in</Link></p>
            </div>
          </div>
        </div>

        {/* Right side - Brand & Info */}
        <div className="w-1/2 h-full bg-mine-shaft-900 rounded-l-[200px] flex items-center justify-center flex-col p-8">
          <div className="flex gap-1 items-center text-bright-shaft-400 mb-8">
            <IconAnchor className="w-16 h-16" stroke={2.5} />
            <div className="text-6xl font-semibold text-bright-sun-400">
              Job Finder
            </div>
          </div>
          
          <div className="text-center max-w-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-mine-shaft-100 mb-4">Password Security Tips</h3>
              <ul className="space-y-3 text-left text-mine-shaft-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-bright-sun-400"></div>
                  Use a unique password for this account
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-bright-sun-400"></div>
                  Avoid using personal information
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-bright-sun-400"></div>
                  Change passwords regularly
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-bright-sun-400"></div>
                  Don't reuse passwords across sites
                </li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-mine-shaft-300 mt-8">
              <div className="w-10 h-10 rounded-full border-2 border-bright-sun-400 flex items-center justify-center">
                <span className="font-semibold text-bright-sun-400">1</span>
              </div>
              <div className="h-1 w-12 bg-bright-sun-400"></div>
              <div className="w-10 h-10 rounded-full border-2 border-bright-sun-400 bg-bright-sun-400 flex items-center justify-center">
                <span className="font-semibold text-mine-shaft-900">2</span>
              </div>
            </div>
            
            <p className="text-lg text-mine-shaft-400 mt-6">
              Secure your account with a strong password
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage