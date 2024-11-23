import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FinanceManager from './components/FinanceManager';
import CalendarComponent from './components/Calendar';
import AttendanceTracker from './components/AttendanceTracker';
import LeaveScheduler from './components/LeaveScheduler';
import Feedback from './components/Feedback';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* 导航栏 */}
        <header className="header-nav">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/finance" className="nav-button">Finance Manager</Link>
          <Link to="/calendar" className="nav-button">Calendar</Link>
          <Link to="/attendance" className="nav-button">Attendance Tracker</Link>
          <Link to="/scheduler" className="nav-button">Leave Scheduler</Link>
          <Link to="/feedback" className="nav-button">Feedback</Link>
        </header>

        {/* 页面内容 */}
        <div id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/finance" element={<FinanceManager />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/scheduler" element={<LeaveScheduler />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;