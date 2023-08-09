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
    handler(response);
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

const serveFile = (filepath, response) => {
  const body = readFileSync(filepath);
  const contentType = getContentType(filepath);
  response.setBody(body);
  response.setStatusCode(200);
  response.setHeader("Content-Type", contentType);
  response.send();
};

const respondHomePage = (response) => {
  const filepath = "./resources/home-page.html";
  serveFile(filepath, response);
};

const respondAbeliophyllumPage = (response) => {
  const filepath = "./resources/abeliophyllum.html";
  serveFile(filepath, response);
};

const respondAgeratumPage = (response) => {
  const filepath = "./resources/ageratum.html";
  serveFile(filepath, response);
};

const respondFavicon = (response) => {
  const filepath = "./resources/image/favicon.ico";
  serveFile(filepath, response);
};

const respondHomepageFlower = (response) => {
  const filepath = "./resources/image/home-page-flower.jpg";
  serveFile(filepath, response);
};

const abeliophyllumFlowerImage = (response) => {
  const filepath = "./resources/image/abeliophyllum.jpg";
  serveFile(filepath, response);
};

const ageratumFlowerImage = (response) => {
  const filepath = "./resources/image/ageratum.jpg";
  serveFile(filepath, response);
};

const setRoutes = (requestHandler) => {
  requestHandler.route("/", respondHomePage);
  requestHandler.route("/abeliophyllum", respondAbeliophyllumPage);
  requestHandler.route("/ageratum", respondAgeratumPage);
  requestHandler.route("/favicon.ico", respondFavicon);
  requestHandler.route("/home-page-flower-image", respondHomepageFlower);
  requestHandler.route("/abeliophyllum-image", abeliophyllumFlowerImage);
  requestHandler.route("/ageratum-image", ageratumFlowerImage);
};

module.exports = {
  setRoutes,
  RequestHandler
};