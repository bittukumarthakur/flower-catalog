const { readFileSync } = require("node:fs");

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

const handleRequest = (request, response) => {
  const { requestLine } = request;
  console.log(request.requestLine);

  if (requestLine.url === "/") {
    respondHomePage(response);
    return;
  };

  if (requestLine.url === "/abeliophyllum.html") {
    respondAbeliophyllumPage(response);
    return;
  };

  if (requestLine.url === "/ageratum.html") {
    respondAgeratumPage(response);
    return;
  };

};

module.exports = {
  handleRequest
};