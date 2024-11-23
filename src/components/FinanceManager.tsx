import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// 定義財務管理所需的型別
interface FinancialData {
  income: number;
  expense: number;
  salary: number;
  bonus: number;
  laborInsurance: number;
  healthInsurance: number;
  netIncome: number;
}

const FinanceManager: React.FC = () => {
  // 使用 useState 設置狀態及其型別
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [salary, setSalary] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [laborInsurance, setLaborInsurance] = useState<number>(0);
  const [healthInsurance, setHealthInsurance] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);

  // 常數的設定
  const LABOR_INSURANCE_RATE = 0.115;
  const EMPLOYEE_LABOR_CONTRIBUTION = 0.2;
  const HEALTH_INSURANCE_RATE = 0.0517;
  const EMPLOYEE_HEALTH_CONTRIBUTION = 0.3;

  // 計算功能
  const handleCalculate = () => {
    const calculatedBonus = salary * 0.15;
    const calculatedLaborInsurance = salary * LABOR_INSURANCE_RATE * EMPLOYEE_LABOR_CONTRIBUTION;
    const calculatedHealthInsurance = salary * HEALTH_INSURANCE_RATE * EMPLOYEE_HEALTH_CONTRIBUTION;

    const calculatedNetIncome = income - expense + salary + calculatedBonus - calculatedLaborInsurance - calculatedHealthInsurance;

    setBonus(calculatedBonus);
    setLaborInsurance(calculatedLaborInsurance);
    setHealthInsurance(calculatedHealthInsurance);
    setNetIncome(calculatedNetIncome);
  };

  // 統計數據
  const data = [
    { name: '收入', value: income },
    { name: '支出', value: expense },
    { name: '薪資', value: salary },
    { name: '獎金', value: bonus },
    { name: '勞保費', value: laborInsurance },
    { name: '健保費', value: healthInsurance },
    { name: '淨收入', value: netIncome }
  ];

  return (
    <div className="container">
      <h2 className="major">財務管理系統</h2>

      {/* 新增使用說明文字 */}
      <div className="instructions">
        <p>這是財務管理系統！在此頁面中，您可以計算您當月的收入、支出、薪資、勞保費、健保費以及淨收入。請根據以下步驟進行操作：</p>
        <ol>
          <li>輸入您的「收入」金額。</li>
          <li>輸入您的「支出」金額。</li>
          <li>輸入您的「薪資」金額。</li>
          <li>點選「計算」按鈕，系統將自動計算出您的獎金、勞保費、健保費以及淨收入。</li>
          <li>計算結果會顯示在下方，並以條形圖形式呈現您的財務狀況。</li>
        </ol>
      </div>

      <div className="form-group">
        <label>
          收入:
          <input
            type="number"
            placeholder="輸入收入"
            onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          支出:
          <input
            type="number"
            placeholder="輸入支出"
            onChange={(e) => setExpense(parseFloat(e.target.value) || 0)}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          薪資:
          <input
            type="number"
            placeholder="輸入薪資"
            onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
          />
        </label>
      </div>
      <button onClick={handleCalculate} className="button-primary">計算</button>
      <div>
        <h3>計算結果</h3>
        <p>獎金: {bonus.toFixed(2)}</p>
        <p>勞保費: {laborInsurance.toFixed(2)}</p>
        <p>健保費: {healthInsurance.toFixed(2)}</p>
        <p>淨收入: {netIncome.toFixed(2)}</p>
      </div>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default FinanceManager;
