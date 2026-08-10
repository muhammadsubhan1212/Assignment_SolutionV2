import { delay } from '../utils/helpers';
import { calcQuote } from '../utils/pricing';

export async function handleMockRequest(config) {
  const method = (config.method || 'get').toLowerCase();
  const url = (config.url || '').replace(/^\//, '');
  const data = typeof config.data === 'string' ? JSON.parse(config.data || '{}') : config.data || {};

  await delay(280);

  if (method === 'post' && url === 'get-fare') {
    const quote = calcQuote({
      academicLevelId: data.academic_level_id,
      deadlineId: data.deadline_id,
      words: data.words,
      pages: data.pages,
      paperType: data.paper_type || 'Essay',
    });
    return {
      status: 200,
      data: {
        per_page_price: quote.perPage,
        per_100_words: quote.per100,
        words: quote.words,
        pages: quote.pages,
        total: quote.total,
        desk_fee: quote.deskFee,
        writing: quote.writing,
        urgency_fee: quote.urgencyFee,
        volume_saved: quote.volumeSaved,
      },
    };
  }

  if (method === 'post' && url === 'contact-us') {
    if (!data.name || !data.email || !data.detail) {
      return { status: 400, data: { success: false, message: 'Please complete all required fields.' } };
    }
    console.info('[MOCK contact-us]', data);
    return {
      status: 200,
      data: { success: true, message: 'Thanks! Our team will reply within one business hour.' },
    };
  }

  if (method === 'post' && url === 'order-now') {
    if (!data.name || !data.email || !data.paperTopic) {
      return { status: 400, data: { success: false, message: 'Missing required order details.' } };
    }
    const orderId = `AS-${Date.now().toString().slice(-8)}`;
    console.info('[MOCK order-now]', { orderId, ...data });
    return {
      status: 200,
      data: {
        success: true,
        orderId,
        message: `Order ${orderId} received. A coordinator will confirm pricing shortly.`,
      },
    };
  }

  if (method === 'post' && url === 'login') {
    if (!data.email || !data.password) {
      return { status: 400, data: { success: false, message: 'Email and password are required.' } };
    }
    const token = `mock-token-${btoa(data.email).slice(0, 16)}`;
    console.info('[MOCK login]', data.email);
    return {
      status: 200,
      data: {
        success: true,
        token,
        user: { email: data.email, name: data.email.split('@')[0] },
        message: 'Welcome back to Assignment Solution.',
      },
    };
  }

  return null;
}
