import api from './api';

export async function getFare({ academic_level_id, deadline_id }) {
  const { data } = await api.post('/get-fare', { academic_level_id, deadline_id });
  return data;
}

export async function submitContact(payload) {
  const { data } = await api.post('/contact-us', payload);
  return data;
}

export async function submitOrder(payload) {
  const { data } = await api.post('/order-now', payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post('/login', payload);
  return data;
}
