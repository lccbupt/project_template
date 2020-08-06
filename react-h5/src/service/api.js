import { jsonp } from '../utils/request';

export function getCouponStatus(params) {
  return jsonp('/9/activity/outerget', { query: params})
}