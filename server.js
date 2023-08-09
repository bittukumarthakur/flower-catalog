const net = require("node:net");
const { parseRequest } = require("./src/parse-request");
const { Response } = require("./src/response");
const { RequestHandler, setRoutes } = require("./src/handle-request");
const PORT = 8000;

const requestLogger = (request) => {
  console.log(request.requestLine);
};

const main = () => {
  const server = net.createServer();
  const requestHandler = new RequestHandler();
  setRoutes(requestHandler);

  server.on("connection", (socket) => {
    socket.setEncoding('utf-8');

    socket.on("data", (data) => {
      const request = parseRequest(data);
      const response = new Response(socket);
      requestLogger(request);
      requestHandler.handle(request, response);
    });
  });

  server.listen(PORT, () => {
    console.log("listening port:", PORT);
  });
};

main();