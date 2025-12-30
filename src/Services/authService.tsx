import axios from 'axios'

const API_URL = 'http://localhost:8081'

/* ================= LOGIN ================= */

export interface LoginRequest {
  email: string
  password: string
}

// nếu backend bạn trả AuthResponse thì có thể mở rộng sau
export interface LoginResponse {
  accessToken: string
  email: string
  role: string
  expiresIn: number
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post(
    `${API_URL}/api/auth/login`,
    data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return res.data
}

/* ================= FORGOT PASSWORD ================= */

export interface ForgotPasswordRequest {
  email: string
}

const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<string> => {
  const res = await axios.post(
    `${API_URL}/api/auth/forgot-password`,
    data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  // backend thường trả message
  return res.data
}

/* ================= RESET PASSWORD ================= */

export interface ResetPasswordRequest {
  otp: string
  newPassword: string
}

const resetPassword = async (
  data: ResetPasswordRequest
): Promise<string> => {
  const res = await axios.post(
    `${API_URL}/api/auth/reset-password`,
    data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return res.data
}

/* ================= EXPORT ================= */

const AuthService = {
  login,
  forgotPassword,
  resetPassword
}

export default AuthService
