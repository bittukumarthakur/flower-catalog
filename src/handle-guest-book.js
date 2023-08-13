const { writeFile } = require("node:fs");

const getDate = () => {
  return new Date().toLocaleString();
};

const generateCommentsElement = (comments) => {
  return comments.map(({ name, date, comment }) => {
    return `<tr>
    <td class="date">${date}</td>
    <td class="name">${name}</td>
    <td class="comment">${comment}</td>
  </tr>`;
  });
};

const serveGuestBook = (request, response) => {
  const { guestBookTemplate } = request;
  const commentsElement = generateCommentsElement(request.messageLog).join("\n");
  const guestBook = (guestBookTemplate.replace("--comments", commentsElement));
  response.end(guestBook);
};

const saveComments = (comments) => {
  writeFile("./resources/users-message.json", JSON.stringify(comments), (error) => {
    console.log("Error in saving comment:", error);
  });
};

const redirectToGuestPage = (request, response) => {
  response.writeHead(302, { location: "/guest-book" });
  response.end();
};

const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

const handleGuestBook = (request, response) => {
  const { queryParams } = request;
  const comments = request.messageLog;
  const name = queryParams.get("name");
  const comment = queryParams.get("comment");
  const date = getDate();

  comments.unshift({ name: capitalizeWord(name), comment: capitalizeWord(comment), date });
  saveComments(comments);
  redirectToGuestPage(request, response);
};

module.exports = {
  handleGuestBook,
  serveGuestBook
};