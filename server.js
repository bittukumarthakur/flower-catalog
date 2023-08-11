const http = require("node:http");
const { handle } = require("./src/handler");

const main = () => {
  const server = http.createServer((request, response) => {
    console.log("url:", request.url);
    handle(request, response);
  });

  server.listen(8000, () => {
    console.log("Listening on:", 8000);
  });
};

main(); 