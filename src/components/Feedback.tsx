import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState<string>(""); 
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      alert("請輸入問題描述！");
      return;
    }
    setIsSubmitted(true); // 切換到成功訊息頁面
  };

  const handleGoBack = () => {
    setIsSubmitted(false); // 返回反饋頁面
    setFeedback(""); // 清空輸入
  };

  return (
    <div className="container">
      <h2 className="major">反饋問題系統</h2>
      {isSubmitted ? (
        // 成功訊息頁面
        <div>
          <h2 className="major">提交成功！</h2>
          <p>感謝您的反饋，我們會盡快處理您的問題。</p>
          <button 
            onClick={handleGoBack} 
            className="button-primary" 
            style={{ marginTop: "20px" }}
          >
            返回
          </button>
        </div>
      ) : (
        // 反饋輸入頁面
        <div>
          {/* 新增說明區塊 */}
          <div className="instructions">
            <p>如果您在使用系統時遇到任何問題或有建議，請通過以下表單進行反饋。</p>
            <ol>
              <li>描述您遇到的問題或提供建議。</li>
              <li>點擊「提交」按鈕將您的反饋發送給我們。</li>
              <li>提交後，您將看到成功訊息。</li>
            </ol>
          </div>

          <h2 className="major">問題反饋</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="請輸入問題描述..."
            className="form-control"
            rows={5}
          />
          <br />
          <button onClick={handleSubmit} className="button-primary">
            提交
          </button>
        </div>
      )}
    </div>
  );
}

export default Feedback;