export class WebClient {
  constructor(defaultOptions = {}) {
    this.defaultOptions = {
      headers: {},
      ...defaultOptions,
    };
  }

  async request(url, options = {}) {
    if (options.query && typeof options.query === 'object') {
      const queryString = new URLSearchParams(options.query).toString();
      url += url.includes('?') ? '&' + queryString : '?' + queryString;
    }

    const res = await fetch(url, {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...(this.defaultOptions.headers || {}),
        ...(options.headers || {}),
      },
    });

    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}\n${text}`);
    }

    if (options.raw) {
      return text;
    }

    if (contentType.includes('application/json')) {
      return JSON.parse(text);
    }

    return text;
  }

  static methods = {
    async GET(instance, url, options = {}) {
      return instance.request(url, {
        method: 'GET',
        ...options,
      });
    },

    async HEAD(instance, url, options = {}) {
      return instance.request(url, {
        method: 'HEAD',
        ...options,
      });
    },

    async OPTIONS(instance, url, options = {}) {
      return instance.request(url, {
        method: 'OPTIONS',
        ...options,
      });
    },

    async POST(instance, url, body, options = {}) {
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      };

      return instance.request(url, {
        method: 'POST',
        body: JSON.stringify(body),
        ...options,
        headers,
      });
    },

    async PUT(instance, url, body, options = {}) {
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      };

      return instance.request(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        ...options,
        headers,
      });
    },

    async DELETE(instance, url, options = {}) {
      return instance.request(url, {
        method: 'DELETE',
        ...options,
      });
    },
  };

  GET(url, options) {
    return WebClient.METHODS.GET(this, url, options);
  }

  HEAD(url, options) {
    return WebClient.METHODS.HEAD(this, url, options);
  }

  OPTIONS(url, options) {
    return WebClient.METHODS.OPTIONS(this, url, options);
  }

  POST(url, body, options) {
    return WebClient.METHODS.POST(this, url, body, options);
  }

  PUT(url, body, options) {
    return WebClient.METHODS.PUT(this, url, body, options);
  }

  DELETE(url, options) {
    return WebClient.METHODS.DELETE(this, url, options);
  }
}
