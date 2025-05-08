export class WebClient {

  constructor(defaultOptions = {}) {
    this.defaultOptions = defaultOptions;
  }

  async get(url, options = {}) {
    return this.request(url, { method: 'GET', ...options });
  }

  async post(url, body, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
  }

  async request(url, options = {}) {
    const res = await fetch(url, { ...this.defaultOptions, ...options });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${res.status} ${res.statusText}\n${text}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return res.json();
    }
    return res.text();
  }
}
