const { readFileSync } = require("node:fs");

const respondHomePage = (request, response) => {
  const body = readFileSync("./src/home-page.html", "utf-8");
  response.setBody(body);
  response.setStatusCode(200);
  response.send();
};

const respondAbeliophyllumPage = (request, response) => {
  const body = readFileSync("./src/abeliophyllum.html", "utf-8");
  response.setBody(body);
  response.setStatusCode(200);
  response.send();
};

const handleRequest = (request, response) => {
  const { requestLine } = request;
  console.log(request.requestLine.url);

  if (requestLine.url === "/") {
    console.log("home")
    respondHomePage(request, response);
    return;
  };

  if (requestLine.url === "/abeliophyllum.html") {
    respondAbeliophyllumPage(request, response);
    return;
  };

};

module.exports = {
  handleRequest
}