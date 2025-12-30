// src/pages/ForgotPasswordPage.tsx
import React from 'react'
import { IconAnchor, IconMail, IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ForgotPassword from '../SignUpLogin/ForgotPassword'

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className='min-h-[100vh] bg-mine-shaft-950 font-["poppins"] overflow-hidden'>
      <div className="relative w-full h-[100vh] flex">
        {/* Left side - Brand & Info */}
        <div className="w-1/2 h-full bg-mine-shaft-900 rounded-r-[200px] flex items-center justify-center flex-col p-8">
          <div className="flex gap-1 items-center text-bright-sun-400 mb-8">
            <IconAnchor className="w-16 h-16" stroke={2.5} />
            <div className="text-6xl font-semibold">
              Job Finder
            </div>
          </div>
          
          <div className="text-center max-w-lg">
            <div className="mb-6 p-4 bg-mine-shaft-800 rounded-2xl border-l-4 border-bright-sun-400">
              <h3 className="text-2xl font-semibold text-mine-shaft-100 mb-2">Password Recovery</h3>
              <p className="text-mine-shaft-300">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-mine-shaft-300 mt-8">
              <div className="w-10 h-10 rounded-full border-2 border-bright-sun-400 bg-bright-sun-400 flex items-center justify-center">
                <span className="font-semibold text-mine-shaft-900">1</span>
              </div>
              <div className="h-1 w-12 bg-mine-shaft-600"></div>
              <div className="w-10 h-10 rounded-full border-2 border-mine-shaft-600 flex items-center justify-center">
                <span className="font-semibold">2</span>
              </div>
            </div>
            
            <p className="text-lg text-mine-shaft-400 mt-6">
              Secure and confidential password reset process
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-mine-shaft-400 hover:text-bright-sun-400 transition-colors mb-8"
            >
              <IconArrowLeft className="w-5 h-5" />
              Back to Login
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-bright-sun-400/10">
                <IconMail className="w-8 h-8 text-bright-sun-400" stroke={2} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-mine-shaft-100">Forgot Password</h1>
                <p className="text-mine-shaft-400">We'll send an OTP to your email</p>
              </div>
            </div>

            <div className="bg-mine-shaft-800 rounded-2xl p-8 mb-6">
              <ForgotPassword />
            </div>

            <div className="text-center text-sm text-mine-shaft-400">
              <p>Don't have an account? <Link to="/signup" className="text-bright-sun-400 hover:underline font-medium">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage