import { useState, useCallback } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

let toastCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, variant = "default", duration = 5000 }: Omit<Toast, "id">) => {
    const id = (++toastCounter).toString()
    const newToast: Toast = { id, title, description, variant, duration }
    
    setToasts((currentToasts) => [...currentToasts, newToast])
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
      }, duration)
    }
    
    return id
  }, [])

  const dismiss = useCallback((toastId?: string) => {
    setToasts((currentToasts) => 
      toastId 
        ? currentToasts.filter((toast) => toast.id !== toastId)
        : []
    )
  }, [])

  return {
    toast,
    dismiss,
    toasts
  }
}
