const { readFile } = require("node:fs");

const FILE_EXTENSIONS = {
  ".html": { "Content-Type": "text/html" },
  ".ico": { "Content-Type": "image/vnd.microsoft.icon" },
  ".jpg": { "Content-Type": "image/jpeg" },
  ".jpeg": { "Content-Type": "image/jpeg" },
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

const handleRequest = (request, response) => {
  const { url } = request;
  console.log({ url });
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