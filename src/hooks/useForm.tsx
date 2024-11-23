import React, { useState, useEffect } from 'react';

// 定義表單數據和錯誤的類型
interface FormValues {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

// 定義從 API 返回的數據結構
interface DataItem {
  id: string;
  name: string;
}

function ExampleForm() {
  const initialValues: FormValues = { name: '', email: '' };
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 處理表單字段變化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // 處理表單提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 簡單的表單驗證
    const newErrors: FormErrors = {};
    if (!values.name) newErrors.name = 'Name is required';
    if (!values.email) newErrors.email = 'Email is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted with values:', values);
    }
  };

  // 獲取數據的自定義 useFetch
  useEffect(() => {
    setLoading(true);
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Form and Data Display</h2>
      
      {/* 表單部分 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* 顯示從 API 獲取的數據 */}
      <h3>Fetched Data</h3>
      <div>
        {data && data.length > 0 ? (
          data.map((item) => <p key={item.id}>{item.name}</p>)
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default ExampleForm;
