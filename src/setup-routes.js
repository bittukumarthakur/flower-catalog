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

const getContentHeaders = (extensionType) => ({ "Content-Type": MIME_TYPE[extensionType] });

const HEADERS = {
  html: getContentHeaders("html"),
  ico: getContentHeaders("ico"),
  jpg: getContentHeaders("jpg"),
  jpeg: getContentHeaders("jpeg"),
  gif: getContentHeaders("gif"),
  css: getContentHeaders("css"),
  js: getContentHeaders("js"),
  json: getContentHeaders("json"),
  pdf: { ...getContentHeaders("pdf"), "Content-Disposition": "attachment" }
};

const getHeaders = (filepath) => {
  const extension = filepath.split(".").at(-1);
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

const serveHomePage = (request, response) => {
  const { config: { PATHS } } = request.context;
  serveFile(PATHS.HOME_PAGE, response);
};

const defaultHandler = (request, response) => {
  const path = "." + request.url;
  serveFile(path, response);
};

const redirectToLogin = (request, response) => {
  response.writeHead(303, { "Location": "/login" });
  response.end();
};

const isNewUser = (request) => {
  const { cookie } = request.headers;
  return cookie ? false : true;
};

const serveGuestBook = (request, response) => {
  const { config: { PATHS } } = request.context;

  if (isNewUser(request)) {
    redirectToLogin(request, response);
    return;
  };

  serveFile(PATHS.GUEST_BOOK_PAGE, response);
};

const serveComments = (request, response) => {
  const { commentRepository } = request.context;
  const comments = commentRepository.get();
  response.writeHead(200, getContentHeaders("json"));
  response.end(JSON.stringify(comments));
};

const serveLoginPage = (request, response) => {
  const { config: { PATHS } } = request.context;
  if (isNewUser(request)) {
    serveFile(PATHS.LOGIN_PAGE, response);
    return;
  }

  response.writeHead(303, { "Location": "/guest-book" });
  response.end();
};

const registerUser = (request, response) => {
  let body = "";
  request.on("data", (data) => body += data);

  request.on("end", () => {
    const [key, userName] = body.split("=");
    response.setHeader("Set-Cookie", `userName=${userName}`);
    response.writeHead(303, { "Location": "/guest-book" });
    response.end();
  });
};

const setupRoutes = (router) => {
  router.fallback(defaultHandler);
  router.route("/", "GET", serveHomePage);
  router.route("/guest-book", "GET", serveGuestBook);
  router.route("/guest-book/comments", "POST", postGuestBookComment);
  router.route("/guest-book/comments", "GET", serveComments);
  router.route("/login", "GET", serveLoginPage);
  router.route("/login", "POST", registerUser);
};

module.exports = {
  setupRoutes,
  isNewUser,
  redirectToLogin
};