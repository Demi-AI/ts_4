import React from 'react';
import { Link } from 'react-router-dom';
import Feedback from '../components/Feedback';
import '../style.css'; // 更新為相對正確路徑

const FeedbackPage: React.FC = () => {
  return (
    <div>
      <h1>問題回饋</h1>
      <Feedback />
      <br />
      {/* 顯示過去的問題回饋 */}
      <div>
        <h2>過去回饋</h2>
        <ul>
          <li>11月5日 - 反映公司設備問題</li>
          <li>11月8日 - 提出工時建議</li>
          {/* 更多回饋 */}
        </ul>
      </div>
    </div>
  );
}

export default FeedbackPage;

