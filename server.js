const http = require("node:http");
const { readFileSync, writeFile } = require("node:fs");
const { setupRoutes } = require("./src/setup-routes");
const { CommentRepository } = require("./src/comment-repository");
const { Router } = require("./src/router");

const PORT = 8000;
const config = {
  PATHS: {
    HOME_PAGE: "./resources/page/index.html",
    GUEST_BOOK_PAGE: "./resources/page/guest-book.html",
    COMMENTS: "./resources/comments.json"
  }
};

const logger = ({ url, method }) => console.log({ url, method });

const main = () => {
  console.log(config.PATHS.COMMENTS);
  const rawComments = readFileSync(config.PATHS.COMMENTS, "utf-8");
  const comments = JSON.parse(rawComments);
  const commentRepository = new CommentRepository(comments, writeFile);
  const router = new Router();
  setupRoutes(router);

  const server = http.createServer((request, response) => {
    logger(request);
    request.context = { commentRepository, config };
    router.handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 