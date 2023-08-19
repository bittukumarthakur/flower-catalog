const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

const getUserName = (request) => {
  const { cookie } = request.headers;
  return new URLSearchParams(cookie).get("username");
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

  if (!getUserName(request)) {
    response.writeHead(303, { "Location": "/login" });
    response.end();
    return;
  };

  request.on("data", (data) => body += data);
  request.on("end", () => {
    console.log("post comment", body);
    saveComment(request, body);
    response.writeHead(201);
    response.end();
  });
};

module.exports = {
  postGuestBookComment,
};