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

const respondFavicon = (response) => {
  const filepath = "./resources/favicon.ico";
  const img = readFileSync(filepath);
  response.setBody(img);
  response.setStatusCode(200);
  response.send();
};

const respondHomepageFlower = (response) => {
  const filepath = "./resources/home-page-flower.jpg";
  const img = readFileSync(filepath);
  response.setBody(img);
  response.setStatusCode(200);
  response.send();
}

const handleRequest = (request, response) => {
  const { requestLine } = request;
  console.log(requestLine);
  if (requestLine.url === "/") {
    respondHomePage(response);
    return;
  };

  if (requestLine.url === "/abeliophyllum") {
    respondAbeliophyllumPage(response);
    return;
  };

  if (requestLine.url === "/ageratum") {
    respondAgeratumPage(response);
    return;
  };

  if (requestLine.url === "/favicon.ico") {
    respondFavicon(response);
    return;
  };

  if (requestLine.url === "/home-page-flower") {
    respondHomepageFlower(response);
    return;
  };

};

module.exports = {
  handleRequest,
};