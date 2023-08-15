const { writeFile } = require("node:fs");
const { generateCommentsElement } = require("./guest-book-template");

const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

const serveGuestBook = (request, response) => {
  const { guestBookTemplate } = request;
  const commentsElement = generateCommentsElement(request.messageLog).join("\n");
  const guestBook = (guestBookTemplate.replace("--comments", commentsElement));
  response.end(guestBook);
};

const saveComments = (comments) => {
  writeFile("./resources/users-message.json", JSON.stringify(comments, null, 2), (error) => {
    if (error) console.log("Error in saving comment:", error);
  });
};

const redirectToGuestPage = (request, response) => {
  response.writeHead(302, { location: "/guest-book" });
  response.end();
};

const parseParams = (params) => {
  const commentLine = new URLSearchParams(params);
  const name = commentLine.get("name");
  const comment = commentLine.get("comment");
  return { name, comment };
};

const handleGuestBook = (request, response) => {
  const comments = request.messageLog;
  let params = "";

  request.on("data", (data) => {
    params += data;
  });

  request.on("end", () => {
    const { name, comment } = parseParams(params);
    const date = new Date();

    comments.unshift({ name: capitalizeWord(name), comment, date });
    saveComments(comments);
    redirectToGuestPage(request, response);
  });
};

module.exports = {
  handleGuestBook,
  serveGuestBook
};