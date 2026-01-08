// src/pages/ForgotPasswordPage.tsx
import React from 'react'
import { IconAnchor, IconMail, IconArrowLeft, IconShieldLock } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ForgotPassword from '../SignUpLogin/ForgotPassword'

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-mine-shaft-950 to-mine-shaft-900 font-["poppins"]'>
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-mine-shaft-300 hover:text-bright-sun-400 transition-colors duration-200 mb-8"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Login</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left side - Brand & Info */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-mine-shaft-800/50 to-mine-shaft-900/50 backdrop-blur-sm rounded-3xl border border-mine-shaft-700 p-8 h-full shadow-2xl">
              <div className="flex flex-col items-center h-full justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-bright-sun-400/20 to-bright-sun-500/10">
                    <IconAnchor className="w-12 h-12 text-bright-sun-400" stroke={2.5} />
                  </div>
                  <div className="text-4xl font-bold text-white">JobFinder</div>
                </div>

                {/* Steps Indicator */}
                <div className="w-full max-w-md mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bright-sun-400 to-bright-sun-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                        <IconMail className="w-7 h-7 text-mine-shaft-900" />
                      </div>
                      <span className="text-sm font-medium text-white">Enter Email</span>
                    </div>
                    
                    <div className="flex-1 h-1 bg-gradient-to-r from-bright-sun-400/30 to-mine-shaft-600 mx-4"></div>
                    
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full border-2 border-mine-shaft-600 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold text-mine-shaft-400">2</span>
                      </div>
                      <span className="text-sm font-medium text-mine-shaft-400">Verify OTP</span>
                    </div>
                    
                    <div className="flex-1 h-1 bg-mine-shaft-600 mx-4"></div>
                    
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full border-2 border-mine-shaft-600 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold text-mine-shaft-400">3</span>
                      </div>
                      <span className="text-sm font-medium text-mine-shaft-400">New Password</span>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-mine-shaft-900/50 p-4 rounded-xl border border-mine-shaft-700">
                    <IconShieldLock className="w-6 h-6 text-bright-sun-400 mb-2" />
                    <h4 className="text-sm font-semibold text-white mb-1">Secure OTP</h4>
                    <p className="text-xs text-mine-shaft-400">One-time password for security</p>
                  </div>
                  <div className="bg-mine-shaft-900/50 p-4 rounded-xl border border-mine-shaft-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 flex items-center justify-center mb-2">
                      <span className="text-xs font-bold text-mine-shaft-900">10</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">10-min Expiry</h4>
                    <p className="text-xs text-mine-shaft-400">OTP expires quickly for safety</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-mine-shaft-800/50 to-mine-shaft-900/50 backdrop-blur-sm rounded-3xl border border-mine-shaft-700 p-8 shadow-2xl h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-bright-sun-400/20 to-bright-sun-500/10">
                  <IconMail className="w-10 h-10 text-bright-sun-400" stroke={2} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Reset Password</h1>
                  <p className="text-mine-shaft-400">Enter your email to receive a verification code</p>
                </div>
              </div>

              <ForgotPassword />

              <div className="text-center pt-8 mt-8 border-t border-mine-shaft-700">
                <p className="text-mine-shaft-400">
                  Remember your password?{' '}
                  <Link 
                    to="/login" 
                    className="text-bright-sun-400 hover:text-bright-sun-300 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
                <p className="text-sm text-mine-shaft-500 mt-2">
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="text-bright-sun-400 hover:underline font-medium"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage