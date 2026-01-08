import axios from 'axios'

const API_URL = 'https://job-search-backend-bcgv.onrender.com'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  email: string
  role: string
  expiresIn: number
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/api/auth/login`, data)
  return res.data
}

/* ================= VERIFY OTP ================= */

export interface VerifyOtpRequest {
  otp: number
}

const verifyOtp = async (data: VerifyOtpRequest): Promise<{ otp: number; message: string }> => {
  const res = await axios.post(`${API_URL}/api/auth/verify-otp`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}

/* ================= FORGOT PASSWORD ================= */

export interface ForgotPasswordRequest {
  email: string
}

const forgotPassword = async (data: ForgotPasswordRequest): Promise<string> => {
  const res = await axios.post(`${API_URL}/api/auth/forgot-password`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}

/* ================= RESET PASSWORD ================= */

export interface ResetPasswordRequest {
  otp: number
  newPassword: string
}

const resetPassword = async (data: ResetPasswordRequest): Promise<string> => {
  const res = await axios.post(`${API_URL}/api/auth/reset-password`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}

/* ================= EXPORT ================= */

const AuthService = {
  forgotPassword,
  verifyOtp,
  resetPassword,
  login
}

export default AuthService
