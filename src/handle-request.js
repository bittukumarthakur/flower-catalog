const { readFile } = require("node:fs");

const FILE_EXTENSIONS = {
  ".html": { "Content-Type": "text/html" },
  ".ico": { "Content-Type": "image/vnd.microsoft.icon" },
  ".jpg": { "Content-Type": "image/jpeg" },
  ".pdf": { "Content-Type": "application/pdf", "Content-Disposition": "attachment" }
};

const getHeaders = (filepath) => {
  const [extension] = filepath.match(/\.[^.]*$/);
  return FILE_EXTENSIONS[extension];
};

const pageNotFound = (response) => {
  response.setBody("page not found");
  response.setStatusCode(404);
  response.send();
};

const serveFile = (filepath, response) => {
  readFile(filepath, (error, body) => {
    if (error) {
      pageNotFound(response);
      return;
    };

    response.setBody(body);
    response.setStatusCode(200);
    response.setHeaders(getHeaders(filepath));
    response.send();
  });
};

const handleRequest = (request, response) => {
  const { url } = request.requestLine;
  if (url === "/") {
    serveFile("./index.html", response);
    return;
  };

  const path = "." + url;
  serveFile(path, response);
  return;
};

module.exports = {
  handleRequest
};