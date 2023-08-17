class Router {
  #routes;
  #defaultHandler;

  constructor() {
    this.#routes = [];
  }

  route(url, method, handler) {
    this.#routes.push({ url, method, handler });
  }

  fallback(handler) {
    this.#defaultHandler = handler;
  }

  #findHandler(url, method) {
    const route = this.#routes.find((route) => {
      return route.url === url && route.method === method;
    });

    return route ? route.handler : this.#defaultHandler;
  }

  handle(request, response) {
    const { url, method } = request;
    const handler = this.#findHandler(url, method);
    handler(request, response);
  }
};

module.exports = { Router };