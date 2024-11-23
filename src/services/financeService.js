import apiClient from './apiClient';

const financeService = {
  getTransactions: async () => {
    const response = await apiClient.get('/finance/transactions');
    return response.data;
  },
  addTransaction: async (transaction) => {
    const response = await apiClient.post('/finance/transactions', transaction);
    return response.data;
  },
  deleteTransaction: async (id) => {
    await apiClient.delete(`/finance/transactions/${id}`);
  },
};

export default financeService;
