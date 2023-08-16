const { generateCommentsElement } = require("./guest-book-template");

const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

const serveGuestBook = (request, response) => {
  const { commentRepository, guestBookTemplate } = request.context;
  const commentsElement = generateCommentsElement(commentRepository.get()).join("\n");
  const guestBookHtml = (guestBookTemplate.replace("--comments", commentsElement));
  response.end(guestBookHtml);
};

const redirectToGuestPage = (request, response) => {
  response.writeHead(302, { location: "/guest-book" });
  response.end();
};

const parseParams = (params) => {
  const commentLine = new URLSearchParams(params);
  return Object.fromEntries(commentLine.entries());
};

const handleGuestBookComment = (request, response) => {
  let params = "";

  request.on("data", (data) => {
    params += data;
  });

  request.on("end", () => {
    const { name, comment } = parseParams(params);
    const { commentRepository } = request.context;
    const date = new Date();
    const commentLine = { name: capitalizeWord(name), comment, date };

    commentRepository.save(commentLine);
    redirectToGuestPage(request, response);
  });
};

module.exports = {
  handleGuestBookComment,
  serveGuestBook
};