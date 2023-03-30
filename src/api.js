import axios from 'axios';
import mockGetPayments from '@/mocks/getPayments';

/**
 * @var {Axios}
 */
const instance = axios.create({
  // todo сделать вызов разных методов, в зависимости от того, продакшен это или билд.
  baseURL: process.env.VUE_APP_API_URL,
});

/**
 * Load payments data.
 *
 * @param {Object} params
 * @returns {Promise}
 */
const getPayments = (params = {}) => instance.request({
  method: 'get',
  url: '/api/v1/payments',
  params,
// eslint-disable-next-line consistent-return
}).catch((e) => {
  if (e.response.status === 404) {
    return mockGetPayments();
  }
});

export default {
  instance,
  getPayments,
};
