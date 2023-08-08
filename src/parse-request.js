const parseRequestLine = (requestLine) => {
  const [method, url, protocol] = requestLine.split(" ");
  return { method, url, protocol };
};

const parseHeaders = (headerLines) => {
  const headers = headerLines.map(line => line.split(": "));
  return Object.fromEntries(headers);
};

const parseRequest = (request) => {
  const [rawRequestLine, ...rawHeaders] = request.split("\r\n");
  const requestLine = parseRequestLine(rawRequestLine);
  const headers = parseHeaders(rawHeaders);
  return { requestLine, headers };
};

exports.parseRequest = parseRequest;