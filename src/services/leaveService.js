import apiClient from './apiClient';

const leaveService = {
  getLeaves: async () => {
    const response = await apiClient.get('/leave');
    return response.data;
  },
  applyLeave: async (leaveData) => {
    const response = await apiClient.post('/leave/apply', leaveData);
    return response.data;
  },
  cancelLeave: async (id) => {
    await apiClient.delete(`/leave/${id}`);
  },
};

export default leaveService;
