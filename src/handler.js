const { readFile } = require("node:fs");
const { handleGuestBook, serveGuestBook } = require("./handle-guest-book");

const MIME_TYPE = {
  html: "text/html",
  ico: "image/vnd.microsoft.icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  pdf: "application/pdf",
  css: "text/css",
  js: "text/javascript"
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

const handle = (request, response) => {
  const { url, method } = request;

  if (url === "/" && method === "GET") {
    serveFile("./resources/page/index.html", response);
    return;
  };

  if (url === "/guest-book" && method === "GET") {
    serveGuestBook(request, response);
    return;
  };

  if (url === "/guest-book/comment" && method === "POST") {
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