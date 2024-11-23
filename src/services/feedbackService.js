import apiClient from './apiClient';

const feedbackService = {
  getFeedback: async () => {
    const response = await apiClient.get('/feedback');
    return response.data;
  },
  submitFeedback: async (feedbackData) => {
    const response = await apiClient.post('/feedback', feedbackData);
    return response.data;
  },
};

export default feedbackService;
