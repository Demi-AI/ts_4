import React from 'react';
import { Link } from 'react-router-dom';
import AttendanceTracker from '../components/AttendanceTracker';
import '../style.css'; // 更新為相對正確路徑

const AttendancePage: React.FC = () => {
  return (
    <div>
      <h2>打卡＆請假頁面</h2>
      <AttendanceTracker />
      <br />
    </div>
  );
}

export default AttendancePage;
