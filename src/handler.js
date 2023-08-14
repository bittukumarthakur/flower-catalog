const { readFile } = require("node:fs");
const { handleGuestBook, serveGuestBook } = require("./handle-guest-book");

const MIME_TYPE = {
  html: "text/html",
  icon: "image/vnd.microsoft.icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  pdf: "application/pdf",
  css: "text/css",
  js: "text/javascript"
};

const getContentType = (extensionType) => ({ "Content-Type": MIME_TYPE[extensionType] });

const HEADERS = {
  ".html": getContentType("html"),
  ".ico": getContentType("icon"),
  ".jpg": getContentType("jpg"),
  ".jpeg": getContentType("jpeg"),
  ".gif": getContentType("gif"),
  ".css": getContentType("css"),
  ".js": getContentType("js"),
  ".pdf": { ...getContentType("pdf"), "Content-Disposition": "attachment" }
};

const getHeaders = (filepath) => {
  const [extension] = filepath.match(/\.[^.]*$/);
  return HEADERS[extension];
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