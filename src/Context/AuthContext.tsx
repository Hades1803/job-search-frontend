import React, { createContext, useContext, useState } from 'react'
import AuthService from '../Services/authService'

interface User {
  email: string
  role: string
}

interface AuthContextType {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = async (email: string, password: string) => {
    const res = await AuthService.login({ email, password })

    localStorage.setItem('token', res.accessToken)
    localStorage.setItem(
      'user',
      JSON.stringify({ email: res.email, role: res.role })
    )

    setToken(res.accessToken)
    setUser({ email: res.email, role: res.role })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
