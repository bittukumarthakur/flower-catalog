const http = require("node:http");
const { handle } = require("./src/handler");
const PORT = 8000;

const main = () => {
  const server = http.createServer((request, response) => {
    console.log("url:", request.url);
    handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 