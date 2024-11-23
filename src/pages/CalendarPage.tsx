import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../components/Calendar';
import '../style.css'; // 更新為相對正確路徑

const CalendarPage: React.FC = () => {
  return (
    <div>
      <h2>行事曆頁面</h2>
      <Calendar />
      <br />
    </div>
  );
}

export default CalendarPage;

