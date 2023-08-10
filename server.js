const http = require("node:http");
const { handleRequest } = require("./src/handler");

const main = () => {
  const server = http.createServer(handleRequest);

  server.listen(8000, () => {
    console.log("Listening on:", 8000);
  });
};

main();