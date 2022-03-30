export class FetchHttpClient {
  static get(url) {
    return fetch(url, {
      method: 'GET',
      // headers: {
      //
      // },
    })
  }
}
