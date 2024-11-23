import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// 定义任务的类型
interface Task {
  id: number;
  date: string;
  task: string;
  status: '未完成' | '已完成';
  className: string;
}

const CalendarComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // 代办事项
  const [workdays, setWorkdays] = useState<string[]>([]); // 上班日
  const [newTask, setNewTask] = useState<string>(''); // 新输入的代办事项
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 被选中的日期

  // 讀取數據
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    const savedWorkdays = JSON.parse(localStorage.getItem('workdays') || '[]') as string[];
    setTasks(savedTasks);
    setWorkdays(savedWorkdays);
  }, []); // 空依賴數組確保只在組件初始化時執行一次

  // 寫入數據
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('workdays', JSON.stringify(workdays));
  }, [tasks, workdays]); // 當 tasks 或 workdays 改變時才寫入


  // 切换单个任务的完成状态
  const toggleTaskStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            status: task.status === '未完成' ? '已完成' : '未完成',
            className: task.status === '未完成' ? 'button-completed' : 'button-pending',
          }
          : task
      )
    );
  };

  // 设置上班日
  const handleWorkdaySelection = (date: Date) => {
    const dateString = date.toDateString();
    if (workdays.includes(dateString)) {
      setWorkdays(workdays.filter((day) => day !== dateString));
    } else {
      setWorkdays([...workdays, dateString]);
    }
  };

  // 更新代办事项的内容
  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  // 送出新的代办事项
  const addNewTask = () => {
    if (selectedDate) {
      const newTaskObj: Task = {
        id: new Date().getTime(), // 使用当前时间戳作为唯一 id
        date: selectedDate.toDateString(),
        task: newTask,
        status: '未完成',
        className: 'button-pending',
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask(''); // 清空输入框
    }
  };

  // 根据选中日期筛选任务
  const renderTasksForSelectedDate = (): Task[] => {
    if (!selectedDate) return [];
    return tasks.filter((task) => task.date === selectedDate.toDateString());
  };

  return (
    <div className="calendar-container content-section">
      <h2 className="major">行事曆任務管理系統</h2>
      <div className="instructions">
        <p>這是一個行事曆任務管理系統，您可以透過以下步驟來管理您的代辦事項：</p>
        <ol>
          <li>選擇上班日：在行事曆中點擊任何一天，將該日期設為上班日，方便閱覽。</li>
          <li>新增代辦事項：先點選日期，然後在代辦事項輸入框中輸入您的任務，並按下「送出」來新增代辦事項。</li>
          <li>查看與更新代辦事項：您可以查看每個日期的代辦事項，並點擊代辦事項旁的按鈕來標記任務為完成或未完成。</li>
        </ol>
      </div>

      {/* 上班日區塊 */}
      <div className="workday">
        <h3>選擇上班日</h3>
        <Calendar
          onClickDay={(date) => {
            setSelectedDate(date); // 設置選中的日期
            handleWorkdaySelection(date); // 設置該日期為上班日
          }}
          tileClassName={({ date }) => {
            const isWorkday = workdays.includes(date.toDateString());
            const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
            return isSelected
              ? 'selected-day'   // 选中的日期
              : isWorkday
                ? 'workday'        // 上班日
                : '';              // 默认情况
          }}
        />
      </div>

      {/* 代辦事項區塊 */}
      <div className="todo-section">
        <h3>代辦事項</h3>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={newTask}
            onChange={handleTaskInput}
            placeholder="輸入代辦事項"
          />
          <button
            className="button-primary"
            onClick={addNewTask}
            disabled={!selectedDate || !newTask} // 當輸入框為空時禁用按鈕
          >
            送出
          </button>
        </div>
      </div>

      {/* 代辦事項表格 */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>日期</th>
              <th>事項內容</th>
              <th>完成狀態</th>
            </tr>
          </thead>
          <tbody>
            {renderTasksForSelectedDate().map((task) => (
              <tr key={task.id}>
                <td>{task.date}</td>
                <td>{task.task}</td>
                <td>
                  <button
                    className={task.className}
                    onClick={() => toggleTaskStatus(task.id)} // 使用 task.id 來切換狀態
                  >
                    {task.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CalendarComponent;
