const { readFileSync } = require("node:fs");

const respondHomePage = (request, response) => {
  const body = readFileSync("./resources/home-page.html", "utf-8");
  response.setBody(body);
  response.setStatusCode(200);
  response.send();
};

const respondAbeliophyllumPage = (request, response) => {
  const body = readFileSync("./resources/abeliophyllum.html", "utf-8");
  response.setBody(body);
  response.setStatusCode(200);
  response.send();
};

const respondAgeratumPage = (request, response) => {
  const body = readFileSync("./resources/ageratum.html", "utf-8");
  response.setBody(body);
  response.setStatusCode(200);
  response.send();
};

const handleRequest = (request, response) => {
  const { requestLine } = request;
  console.log(request.requestLine.url);

  if (requestLine.url === "/") {
    respondHomePage(request, response);
    return;
  };

  if (requestLine.url === "/abeliophyllum.html") {
    respondAbeliophyllumPage(request, response);
    return;
  };

  if (requestLine.url === "/ageratum.html") {
    respondAgeratumPage(request, response);
    return;
  };

};

module.exports = {
  handleRequest
};