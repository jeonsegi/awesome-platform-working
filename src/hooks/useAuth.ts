import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  businessName: string
  role: string
  tier: string
  marginRate: number
  isVerified: boolean
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      const authData = localStorage.getItem('authData')
      if (authData) {
        try {
          const userData = JSON.parse(authData)
          setUser(userData)
        } catch (error) {
          localStorage.removeItem('authData')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('authData', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authData')
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  }
}
