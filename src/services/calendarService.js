import apiClient from './apiClient';

const calendarService = {
  getEvents: async () => {
    const response = await apiClient.get('/calendar/events');
    return response.data;
  },
  addEvent: async (event) => {
    const response = await apiClient.post('/calendar/events', event);
    return response.data;
  },
  deleteEvent: async (id) => {
    await apiClient.delete(`/calendar/events/${id}`);
  },
};

export default calendarService;
