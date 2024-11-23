import React, { useState, useEffect } from 'react';

interface DataItem {
  id: string;  // 假設 id 是 string 類型，根據實際 API 返回結構調整
  name: string; // 假設 name 是 string 類型，根據實際 API 返回結構調整
}

// useFetch hook，接收泛型 T 來處理不同的數據類型
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result); // 設置為獲得的數據
        setLoading(false); // 設置加載狀態為 false
      } catch (err) {
        setError(err as Error); // 設置錯誤
        setLoading(false); // 加載結束
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

// DataDisplay 組件
function DataDisplay() {
  // 使用 useFetch，傳入 DataItem[] 這個泛型
  const { data, loading, error } = useFetch<DataItem[]>('https://api.example.com/data');

  // 加載中顯示
  if (loading) return <p>Loading...</p>;

  // 錯誤顯示
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* 如果 data 存在，顯示每一項數據 */}
      {data && data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

export default DataDisplay;


