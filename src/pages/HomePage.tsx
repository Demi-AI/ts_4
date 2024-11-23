import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '/style.css'; // 因為 public 文件夾中的文件會作為靜態資源處理


const HomePage: React.FC = () => {
  return (
    <div className="content-section">
      <h1>Employee Management System</h1>
      <p className="welcome-message">
        歡迎來到員工管理系統，請選擇您想要前往的功能頁面：
      </p>
    </div>
  );
}

export default HomePage;

