const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

const request = axios.create();
const cookieJar = new tough.CookieJar();
request.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
axiosCookieJarSupport(request);
request.defaults.jar = cookieJar;
request.defaults.withCredentials = true;

module.exports = {
  post: async (url, data) => {
    const searcher = new URLSearchParams();

    for (const item in data) {
      searcher.append(item, data[item]);
    }

    const { data: html } = await request.post(url, searcher);

    return html;
  },
  get: async (url) => {
    const { data: html } = await request.get(url);
    return html;
  }
}