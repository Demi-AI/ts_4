import React from 'react';
import FinanceManager from '../components/FinanceManager';
import '../style.css'; // 更新為相對正確路徑

function FinancePage(): JSX.Element {
  return (
    <div>
      <h2>財務管理頁面</h2>
      <FinanceManager />
      <br />
    </div>
  );
}

export default FinancePage;
