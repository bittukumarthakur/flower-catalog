class Response {
  #socket;
  #messageBody;
  #headers;
  #protocol;
  #statusCode;
  #statusMessage;

  constructor(socket) {
    this.#socket = socket;
    this.#headers = {};
    this.#protocol = "HTTP/1.1";
  }

  setBody(message) {
    this.#messageBody = message;
  }

  setStatusCode(code) {
    const statusMessages = {
      200: "OK",
      400: "BAD_REQUEST",
      404: "NOT_FOUND",
      405: "METHOD_NOT_ALLOWED"
    };

    this.#statusCode = code;
    this.#statusMessage = statusMessages[code];
  }

  setHeader(title, value) {
    this.#headers[title] = value;
  }

  #formatHeaders() {
    return Object.entries(this.#headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\r\n');
  }

  #formatResponseLine() {
    return `${this.#protocol} ${this.#statusCode} ${this.#statusMessage}`;
  }

  #formatResponse() {
    const newLine = '\r\n';
    const responseLine = this.#formatResponseLine();
    const headers = this.#formatHeaders();

    let response = "";
    response += responseLine + newLine;
    response += headers + newLine;
    response += newLine;

    // response += this.#messageBody;
    return response;
  }

  send() {
    const date = new Date().toGMTString();
    const contentLength = this.#messageBody.length;
    this.setHeader("DATE", date);
    this.setHeader("Content-length", contentLength);

    const response = this.#formatResponse();
    this.#socket.write(response);
    this.#socket.write(this.#messageBody);
    this.#socket.end();
  }
};

exports.Response = Response;