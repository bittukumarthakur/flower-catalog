const { readFile } = require("node:fs");
const { handleGuestBook, serveGuestBook } = require("./handle-guest-book");

const FILE_EXTENSIONS = {
  ".html": { "Content-Type": "text/html" },
  ".ico": { "Content-Type": "image/vnd.microsoft.icon" },
  ".jpg": { "Content-Type": "image/jpeg" },
  ".jpeg": { "Content-Type": "image/jpeg" },
  ".gif": { "Content-Type": "image/gif" },
  ".pdf": { "Content-Type": "application/pdf", "Content-Disposition": "attachment" }
};

const getHeaders = (filepath) => {
  const [extension] = filepath.match(/\.[^.]*$/);
  return FILE_EXTENSIONS[extension];
};

const serveFile = (filepath, response) => {
  readFile(filepath, (error, body) => {
    if (error) {
      response.statusCode = 404;
      response.end("Not Found");
      return;
    };

    response.writeHead(200, getHeaders(filepath));
    response.end(body);
  });
};

const getQueryParams = (url) => {
  const [, queryString] = url.split("?");
  return new URLSearchParams(queryString);
};

const handle = (request, response) => {
  const { url } = request;
  request.queryParams = getQueryParams(url);

  if (url === "/") {
    serveFile("./resources/page/index.html", response);
    return;
  };

  if (url === "/guest-book") {
    serveGuestBook(request, response);
    return;
  };  

  if (url.startsWith("/guest-book/comment")) {
    handleGuestBook(request, response);
    return;
  };

  const path = "." + url;
  serveFile(path, response);
  return;
};

module.exports = {
  handle
};