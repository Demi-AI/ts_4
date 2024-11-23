const errorHandler = (error) => {
    if (error.response) {
      // 伺服器回應的錯誤
      return error.response.data.message || '伺服器錯誤';
    }
    if (error.request) {
      // 沒有收到伺服器回應
      return '無法連接伺服器';
    }
    // 其他錯誤
    return '發生未知錯誤';
  };
  
  export default errorHandler;
  