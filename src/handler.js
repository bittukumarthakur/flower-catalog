const { readFile } = require("node:fs");
const { postGuestBookComment } = require("./post-guest-book-comment");

const MIME_TYPE = {
  html: "text/html",
  ico: "image/vnd.microsoft.icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  pdf: "application/pdf",
  css: "text/css",
  js: "text/javascript",
  json: "application/json"
};

const getContentType = (extensionType) => ({ "Content-Type": MIME_TYPE[extensionType] });

const getHeaders = (filepath) => {
  const extension = filepath.split(".").pop();
  const pdfHeader = { ...getContentType("pdf"), "Content-Disposition": "attachment" };
  return extension === "pdf" ? pdfHeader : getContentType(extension);
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

const serveHomePage = (request, response) => {
  const path = "./resources/page/index.html";
  serveFile(path, response);
};

const defaultHandler = (request, response) => {
  const path = "." + request.url;
  serveFile(path, response);
};

const serveGuestBook = (request, response) => {
  const path = "./resources/page/guest-book.html";
  serveFile(path, response);
};

const serveComments = (request, response) => {
  const { commentRepository } = request.context;
  const comments = commentRepository.get();
  response.writeHead(200, getContentType("json"));
  response.end(JSON.stringify(comments));
};


const setupRoutes = (requestHandler) => {
  requestHandler.defaultRoute(defaultHandler);
  requestHandler.route({ url: "/", method: "GET" }, serveHomePage);
  requestHandler.route({ url: "/guest-book", method: "GET" }, serveGuestBook);
  requestHandler.route({ url: "/guest-book/comments", method: "POST" }, postGuestBookComment);
  requestHandler.route({ url: "/guest-book/comments", method: "GET" }, serveComments);
};

module.exports = {
  setupRoutes
};