const { readFile } = require("node:fs");

const CONTENT_TYPE = {
  ".html": "text/html",
  ".ico": "image/vnd.microsoft.icon",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf"
};

const getContentType = (filepath) => {
  const [extension] = filepath.match(/\.[^.]*$/);
  return CONTENT_TYPE[extension];
};

const pageNotFound = (response) => {
  response.setBody("page not found");
  response.setStatusCode(404);
  response.send();
}

const serveFile = (filepath, response) => {
  readFile(filepath, (error, body) => {``
    if (error) {
      pageNotFound(response);
      return;
    };

    const contentType = getContentType(filepath);
    if (contentType === "application/pdf") {
      response.setHeader("Content-Disposition", "attachment");
    };

    response.setBody(body);
    response.setStatusCode(200);
    response.setHeader("Content-Type", contentType);
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