const http = require("node:http");
const { handle } = require("./src/handler");
const { readFileSync, writeFile } = require("node:fs");
const { CommentRepository } = require("./src/comment-repository");

const PORT = 8000;

const logger = (response) => console.log({ url: response.url, method: response.method });

const main = () => {
  const guestBookTemplate = readFileSync("./resources/page/guest-book-template.html", "utf-8");
  const commentRepository = new CommentRepository(readFileSync, writeFile);
  commentRepository.load();

  const server = http.createServer((request, response) => {
    request.context = { commentRepository, guestBookTemplate };

    logger(request);
    handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 