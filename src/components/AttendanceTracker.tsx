import React, { useState } from 'react';
import { savePunchData } from '../services/attendanceService';

// 格式化時間為 HH:mm 格式
const formatTime = (time: Date): string => {
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 計算當日工時
const calculateWorkHours = (startTime: string, endTime: string): number => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const diff = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
  return Math.floor(diff * 2) / 2; // 四捨五入到最接近的半小時
};

// 定義打卡記錄的類型
interface AttendanceRecord {
  date: string;
  punchTimes: string[];
  startTime: string;
  endTime: string;
  dailyWorkHours: number;
}

const AttendanceTracker: React.FC = () => {
  // 讀取 localStorage 中的打卡記錄和總時數
  const savedRecords: AttendanceRecord[] =
    JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
  const savedTotalHours = savedRecords.reduce(
    (total, record) => total + record.dailyWorkHours,
    0
  );

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(
    savedRecords
  ); // 打卡紀錄
  const [totalHours, setTotalHours] = useState<number>(savedTotalHours); // 累積總工時

  const handlePunch = (): void => {
    const punchTime = new Date();
    const date = punchTime.toLocaleDateString();
    const time = formatTime(punchTime);

    setAttendanceRecords((prevRecords) => {
      const updatedRecords = [...prevRecords];
      const existingRecord = updatedRecords.find((record) => record.date === date);

      if (existingRecord) {
        // 更新下班時間
        existingRecord.punchTimes.push(time);
        existingRecord.endTime = time;

        // 計算當日工時
        const dailyWorkHours = calculateWorkHours(existingRecord.startTime, time);
        const additionalHours = dailyWorkHours - existingRecord.dailyWorkHours;
        existingRecord.dailyWorkHours = dailyWorkHours;

        // 更新累積總工時
        setTotalHours((prevTotal) => prevTotal + additionalHours);
      } else {
        // 新增當天的打卡紀錄
        updatedRecords.push({
          date,
          punchTimes: [time],
          startTime: time,
          endTime: time,
          dailyWorkHours: 0,
        });
      }

      // 儲存打卡數據到伺服器
      savePunchData({ date, punchTime });

      // 儲存打卡數據到 localStorage
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
      return updatedRecords;
    });
  };

  return (
    <div className="content-section">
      <h2 className="major">打卡系統</h2>
      <div className="instructions">
        <p>
          這是一個打卡系統，您可以通過此系統記錄您的上班和下班時間，並且得知當日的時數及當月累積時數。
          請務必在上班前半小時打卡，以半小時制區間計算時數！
        </p>
        <p>
          （可重複打多次卡，將以最早打卡時間作為上班時間，最晚打卡時間作為下班時間。）
        </p>
        <ol>
          <li>點擊「打卡」按鈕來記錄您的上班時間。</li>
          <li>在結束工作後再次點擊「打卡」來記錄您的下班時間。</li>
          <li>系統會自動計算當日的工作時數和當月累積的工作時數。</li>
          <li>您可以查看每一天的打卡紀錄及總時數。</li>
        </ol>
      </div>

      {/* 打卡按鈕 */}
      <button onClick={handlePunch} className="button-primary">
        打卡
      </button>

      {/* 打卡紀錄標題 */}
      <h2 className="major">打卡紀錄</h2>

      {/* 打卡紀錄表格 */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>日期</th>
              <th>上班時間</th>
              <th>下班時間</th>
              <th>當日時數</th>
              <th>當月總時數</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.startTime}</td>
                <td>{record.endTime}</td>
                <td>{record.dailyWorkHours.toFixed(2)}</td>
                <td>{totalHours.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTracker;
