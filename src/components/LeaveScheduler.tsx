import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '/style.css'; // 因為 public 文件夾中的文件會作為靜態資源處理

// 定义请假日期的类型
type VacationDay = string; // 每个请假日期都是 'YYYY-MM-DD' 格式的字符串

// 保存请假日期到 localStorage
const saveVacationDays = (vacationDays: VacationDay[]): void => {
  localStorage.setItem('vacationDays', JSON.stringify(vacationDays));
};

// 从 localStorage 读取请假日期
const loadVacationDays = (): VacationDay[] => {
  const savedVacationDays = localStorage.getItem('vacationDays');
  return savedVacationDays ? JSON.parse(savedVacationDays) : [];
};

const VacationCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date()); // 记录当前选中的日期
  const [vacationDays, setVacationDays] = useState<VacationDay[]>(loadVacationDays()); // 从 localStorage 加载请假日期

  // 处理日期点击：添加或移除请假日期
  const handleDateClick = (date: Date): void => {
    setDate(date);
    const dateString = date.toLocaleDateString('en-CA'); // 使用本地化格式 'YYYY-MM-DD'
    
    if (vacationDays.includes(dateString)) {
      // 移除已选的请假日期
      const updatedVacationDays = vacationDays.filter((day) => day !== dateString);
      setVacationDays(updatedVacationDays);
      saveVacationDays(updatedVacationDays); // 保存到 localStorage
    } else {
      // 新增请假日期
      const updatedVacationDays = [...vacationDays, dateString];
      setVacationDays(updatedVacationDays);
      saveVacationDays(updatedVacationDays); // 保存到 localStorage
    }
  };

  return (
    <div className="container">
      <h2 className="major">劃假行事曆系統</h2>
      <div className="instructions">
        <p>這是一個劃假行事曆，員工可以選擇請假日期，而公司則可檢視完整的劃假行事曆。</p>
        <ol>
          <li>選擇劃假日期：點擊行事曆中的任何日期來選擇劃假日，選中的日期會標記顯示。</li>
          <li>取消劃假：如果您已選擇日期並想要取消，請再次點擊該日期，即可取消。</li>
          <li>查看劃假日期：在下方列表中查看所有已選擇的劃假日期。</li>
        </ol>
      </div>

      {/* 顯示日曆 */}
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick} // 使用 onClickDay 來處理日期點擊事件
          value={date}
          tileClassName={({ date }) =>
            vacationDays.includes(date.toLocaleDateString('en-CA')) ? 'highlight' : ''
          }
        />
      </div>

      {/* 顯示選中的請假日期 */}
      <div className="vacation-summary">
        <h3>已劃假日期</h3>
        <ul>
          {vacationDays.length === 0 ? (
            <li>尚未劃假</li>
          ) : (
            vacationDays.map((day, index) => <li key={index}>{day}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default VacationCalendar;
