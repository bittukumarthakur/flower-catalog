const { readFileSync, writeFileSync } = require("node:fs");

const getDate = () => {
  return new Date().toLocaleString();
};

const generateCommentsElements = (comments) => {
  return comments.map(({ name, date, comment }) => {
    return `<p>${date},  ${name} ${comment}</p>`;
  });
};

const guestBookHtml = (comments) => {
  const template = readFileSync("./resources/page/guest-book-template.html", "utf-8");
  const commentsElement = generateCommentsElements(comments).join("");
  return (template.replace("--comments", commentsElement));
};

const serveGuestBook = (request, response) => {
  response.end(guestBookHtml(request.messageLog));
};

const saveComments = (comments) => {
  writeFileSync("./resources/users-message.json", JSON.stringify(comments));
};

const redirectToGuestPage = (request, response) => {
  response.writeHead(302, { location: "/guest-book" });
  response.end();
};

const handleGuestBook = (request, response) => {
  const { queryParams } = request;
  const comments = request.messageLog;
  const name = queryParams.get("name");
  const comment = queryParams.get("comment");
  const date = getDate();

  comments.unshift({ name, comment, date });
  saveComments(comments);
  redirectToGuestPage(request, response);
};

module.exports = {
  handleGuestBook,
  serveGuestBook
};