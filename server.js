const http = require("node:http");
const { handle } = require("./src/handler");
const { readFileSync } = require("node:fs");
const PORT = 8000;

const main = () => {
  const messageLog = JSON.parse(readFileSync("./resources/users-message.json"));
  const guestBookTemplate = readFileSync("./resources/page/guest-book-template.html", "utf-8");

  const server = http.createServer((request, response) => {
    console.log({ url: request.url });
    request.messageLog = messageLog;
    request.guestBookTemplate = guestBookTemplate;
    handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 