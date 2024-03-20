import React, { useState, createContext, useContext, ReactNode } from 'react'
import './toast.css' // CSSファイルのインポート
import CheckmarkIcon from './Checkmark'
import NGmarkIcon from './NGmark'

type ToastTypes = 'normal' | 'error'

const ToastContext = createContext(
  ({}: { text: string; type?: ToastTypes }) => {}
)
ToastContext.displayName = 'Toastcontext'

// useToastを使って深い階層のコンポーネントでもトーストを使えるようにする
export const useToast = () => {
  return useContext(ToastContext)
}

interface Props {
  children?: React.ReactNode
}

// 大元のコンポーネントを囲うためのProvider。トーストの実態もここに入れておく
export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toastType, setToastType] = useState<ToastTypes>(null)

  const showToast = ({ type = 'normal' }: { type?: ToastTypes }) => {
    setToastType(type)
    setTimeout(() => {
      setToastType(null)
    }, 5000)
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toastType && (
        <div className={`toast ${toastType === 'normal' ? 'normal' : 'error'}`}>
          <ToastIcon toastType={toastType} />
          <div>{toastText({ toastType })}</div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

const ToastIcon = ({ toastType }: { toastType: ToastTypes }) => {
  switch (toastType) {
    case 'normal':
      return <CheckmarkIcon />
    case 'error':
      return <NGmarkIcon />
  }
}

const toastText = ({ toastType }: { toastType: ToastTypes }) => {
  switch (toastType) {
    case 'normal':
      return 'Success'
    case 'error':
      return 'Error'
  }
}
