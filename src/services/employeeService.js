import { request } from './api';

export const employeeService = {
  list: (params) => request('/employees', { params }),
  get: (id) => request(`/employees/${id}`),
  create: (payload) => request('/employees', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/employees/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => request(`/employees/${id}`, { method: 'DELETE' }),
};
