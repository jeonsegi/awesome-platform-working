import * as React from "react"

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastCount = 0;

function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER
  return toastCount.toString()
}

type Toast = ToastProps & { id: string }

const listeners: Array<(toasts: Toast[]) => void> = []
let memoryToasts: Toast[] = []

function dispatch(toasts: Toast[]) {
  memoryToasts = toasts
  listeners.forEach((listener) => {
    listener(memoryToasts)
  })
}

function toast(props: ToastProps) {
  const id = genId()
  const newToast = { ...props, id }
  
  dispatch([...memoryToasts, newToast])
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    dispatch(memoryToasts.filter(t => t.id !== id))
  }, 5000)
  
  return { id }
}

function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>(memoryToasts)

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      const index = listeners.indexOf(setToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    toasts,
    toast,
    dismiss: (toastId: string) => {
      dispatch(memoryToasts.filter(t => t.id !== toastId))
    },
  }
}

export { useToast, toast }
