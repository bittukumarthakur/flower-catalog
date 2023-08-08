const net = require("node:net");
const { parseRequest } = require("./parse-request");
const PORT = 8000;

const main = () => {
  const server = net.createServer();

  server.on("connection", (socket) => {
    socket.setEncoding('utf-8');

    socket.on("data", (data) => {
      console.log(parseRequest(data));
      socket.end();
    });
  });

  server.listen(PORT, () => {
    console.log("listening at ", PORT);
  });
};

main();