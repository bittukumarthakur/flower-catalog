const http = require("node:http");
const { readFileSync, writeFile } = require("node:fs");
const { setupRoutes } = require("./src/handler");
const { CommentRepository } = require("./src/comment-repository");
const { RequestHandler } = require("./src/request-handle");

const PORT = 8000;
const logger = (response) => console.log({ url: response.url, method: response.method });

const main = () => {
  const guestBookTemplate = readFileSync("./resources/page/guest-book-template.html", "utf-8");
  const commentRepository = new CommentRepository(readFileSync, writeFile);
  commentRepository.load();

  const requestHandler = new RequestHandler();
  setupRoutes(requestHandler);

  const server = http.createServer((request, response) => {
    logger(request);
    request.context = { commentRepository, guestBookTemplate };
    requestHandler.handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 