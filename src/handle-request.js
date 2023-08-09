const { readFileSync } = require("node:fs");

class RequestHandler {
  #routes;
  constructor() {
    this.#routes = {};
  }

  route(path, handler) {
    this.#routes[path] = handler;
  }

  #findHandler(path) {
    return this.#routes[path];
  }

  handle(request, response) {
    const { requestLine } = request;
    const handler = this.#findHandler(requestLine.url);
    handler(request, response);
  }
};

const CONTENT_TYPE = {
  ".html": "text/html",
  ".ico": "image/vnd.microsoft.icon",
  ".jpg": "image/jpeg"
};

const getContentType = (filepath) => {
  const [extension] = filepath.match(/\.[^.]*$/);
  return CONTENT_TYPE[extension];
};

const serveFileByPath = (filepath, response) => {
  const body = readFileSync(filepath);
  const contentType = getContentType(filepath);
  response.setBody(body);
  response.setStatusCode(200);
  response.setHeader("Content-Type", contentType);
  response.send();
};

const serveFile = (request, response) => {
  const { url } = request.requestLine;
  if (url === "/") {
    serveFileByPath("./resources/html/home-page.html", response);
    return;
  };

  const path = "." + url;
  serveFileByPath(path, response);
  return;
};

module.exports = {
  serveFile
};