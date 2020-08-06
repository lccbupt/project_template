import fetchJsonp from 'fetch-jsonp';
import { merge } from 'lodash';
import { stringify } from 'qs';
import HOST_LIST from '../config/api';

const isDev = process.env.NODE_ENV !== 'production';

const CODE = {
  OK: 0,
  LOGIN: -99
};

export function jsonp(url, options = {}) {
  const defaultOptions = {
    ignoreErr: false, // ignore error message
    needLogin: false,
    query: {},
    host: isDev ? HOST_LIST.API.development : HOST_LIST.API.production
  };
  const newOptions = merge({}, defaultOptions, options);
  url = newOptions.host + url;

  let qs = newOptions.query ? `?${stringify(newOptions.query)}` : '';
  url += qs;

  return fetchJsonp(url, newOptions)
    .then((res) => res.json())
    .then((res) => {
      if (res.errno === 0) {
        return res.data;
      }
      if (!newOptions.ignoreErr && res.errno !== 0) {
        console.log(res)
        return res;
      }
      if(newOptions.needLogin && res.errno === CODE.LOGIN) {
        console.log('login')
      }
    })
    .catch((e) => {
      return e;
    });
}


