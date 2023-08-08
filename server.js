const net = require("node:net");
const { parseRequest } = require("./src/parse-request");
const { readFileSync } = require("node:fs");
const { Response } = require("./src/response");
const PORT = 8000;

const handleRequest = (request, response) => {
  const homepage = readFileSync("./src/home-page.html", "utf-8");
  response.setBody(homepage);
  response.setStatusCode(200);
  response.send();
};

const main = () => {
  const server = net.createServer();

  server.on("connection", (socket) => {
    socket.setEncoding('utf-8');

    socket.on("data", (data) => {
      const request = parseRequest(data);
      const response = new Response(socket);
      handleRequest(request, response);
    });
  });

  server.listen(PORT, () => {
    console.log("listening at ", PORT);
  });
};

main();