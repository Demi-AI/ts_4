import React from 'react';
import '/Header.css';

interface HeaderProps {
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  return (
    <nav className="header-nav">
      <button onClick={() => setPage('Finance')} className="nav-button">財務管理</button>
      <button onClick={() => setPage('Calendar')} className="nav-button">行事曆</button>
      <button onClick={() => setPage('Attendance')} className="nav-button">請假打卡</button>
      <button onClick={() => setPage('LeaveScheduler')} className="nav-button">劃假行事曆</button>
      <button onClick={() => setPage('Feedback')} className="nav-button">問題回饋</button>
    </nav>
  );
}

export default Header;


