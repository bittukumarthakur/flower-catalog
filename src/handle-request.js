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

const serveFile = (filepath, response) => {
  const body = readFileSync(filepath, "utf-8");
  response.setBody(body);
  response.setStatusCode(200);
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

const serveImage = (filepath, response) => {
  const image = readFileSync(filepath);
  response.setBody(image);
  response.setStatusCode(200);
  response.send();
};

const respondFavicon = (response) => {
  const filepath = "./resources/favicon.ico";
  serveImage(filepath, response);
};

const respondHomepageFlower = (response) => {
  const filepath = "./resources/home-page-flower.jpg";
  serveImage(filepath, response);
};

const abeliophyllumFlowerImage = (response) => {
  const filepath = "./resources/abeliophyllum.jpg";
  serveImage(filepath, response);
};

const ageratumFlowerImage = (response) => {
  const filepath = "./resources/ageratum.jpg";
  serveImage(filepath, response);
};

const handleRequest = (request, response, requestHandler) => {
  console.log(request.requestLine);

  requestHandler.route("/", respondHomePage);
  requestHandler.route("/abeliophyllum", respondAbeliophyllumPage);
  requestHandler.route("/ageratum", respondAgeratumPage);
  requestHandler.route("/favicon.ico", respondFavicon);
  requestHandler.route("/home-page-flower-image", respondHomepageFlower);
  requestHandler.route("/abeliophyllum-image", abeliophyllumFlowerImage);
  requestHandler.route("/ageratum-image", ageratumFlowerImage);

  requestHandler.handle(request, response);
};

module.exports = {
  handleRequest,
  RequestHandler
};