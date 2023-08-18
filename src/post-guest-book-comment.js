const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

const getUserName = (request) => {
  const { cookie } = request.headers;
  return cookie.split("=").at(-1);
};

const saveComment = (request, body) => {
  const { commentRepository } = request.context;
  const { comment } = JSON.parse(body);
  const userName = getUserName(request);
  const date = new Date();

  const commentLine = { name: capitalizeWord(userName), comment, date };
  commentRepository.save(commentLine);
};

const postGuestBookComment = (request, response) => {
  let body = "";

  request.on("data", (data) => body += data);

  request.on("end", () => {
    saveComment(request, body);
    response.writeHead(201);
    response.end();
  });
};

module.exports = {
  postGuestBookComment,
};