import api from './api';

export async function getFare({ academic_level_id, deadline_id }) {
  const { data } = await api.post('/get-fare', { academic_level_id, deadline_id });
  return data;
}

// Form endpoints return { success, message } even on 4xx/5xx — surface that message.
async function postForm(path, payload) {
  try {
    const { data } = await api.post(path, { ...payload, page: window.location.pathname });
    return data;
  } catch (err) {
    if (err.response?.data?.message) return err.response.data;
    return { success: false, message: 'Network error — please check your connection or message us on WhatsApp.' };
  }
}

export function submitContact(payload) {
  return postForm('/contact-us', payload);
}

export function submitOrder(payload) {
  return postForm('/order-now', payload);
}

export async function loginUser(payload) {
  const { data } = await api.post('/login', payload);
  return data;
}
