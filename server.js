const http = require("node:http");
const { handle } = require("./src/handler");
const { readFileSync } = require("node:fs");
const PORT = 8000;

const logger = (url) => console.log({ url: url });

const main = () => {
  const messageLog = JSON.parse(readFileSync("./resources/users-message.json"));
  const guestBookTemplate = readFileSync("./resources/page/guest-book-template.html", "utf-8");

  const server = http.createServer((request, response) => {
    request.messageLog = messageLog;
    request.guestBookTemplate = guestBookTemplate;

    logger(request.url);
    handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 