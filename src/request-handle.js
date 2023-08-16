class RequestHandler {
  #routes;
  #defaultHandler;

  constructor() {
    this.#routes = [];
  }

  route(requestLine, handler) {
    // requestLine = {url , method} - think about name;
    this.#routes.push({ requestLine, handler });
  }

  defaultRoute(handler) {
    this.#defaultHandler = handler;
  }

  #findHandler(url, method) {
    const route = this.#routes.find(({ requestLine }) => {
      return requestLine.url === url && requestLine.method === method;
    });

    return route ? route.handler : this.#defaultHandler;
  }

  handle(request, response) {
    const { url, method } = request;
    const handler = this.#findHandler(url, method);
    handler(request, response);
  }
};

module.exports = { RequestHandler };