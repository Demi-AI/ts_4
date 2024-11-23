import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // 確保 index.css 存在並正確加載
import App from './App' // 確保 App.tsx 存在並正確加載

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  console.error('Could not find the root element in the HTML')
}
