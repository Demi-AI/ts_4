import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // 引入 BrowserRouter

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('找不到根元素');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 包裹 App 組件 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
