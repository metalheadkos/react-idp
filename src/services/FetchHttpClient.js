export class FetchHttpClient {
  static get(url, query = {}) {
    if (Object.keys(query).length > 0) {
      const qParams = new URLSearchParams(query)
      // eslint-disable-next-line no-param-reassign
      url = `${url}?${qParams}`
    }

    return fetch(url, { method: 'GET' })
  }
}
