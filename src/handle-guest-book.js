const { readFileSync } = require("node:fs");

const getDate = () => {
  return "12/08/2023,10:30:55";
};

const generateCommentsElements = (comments) => {
  return comments.map(({ name, date, comment }) => {
    return `<p>${date},  ${name} ${comment}</p>`;
  });

};

const guestBookHtml = (comments) => {
  const template = readFileSync("./resources/page/guest-book.html", "utf-8");
  const commentsElement = generateCommentsElements(comments).join();
  return (template.replace("--comments", commentsElement));
};

const handleGuestBook = (request, response) => {
  const { queryParams } = request;
  const comments = [];
  const name = queryParams.get("name");
  const comment = queryParams.get("comment");
  const date = getDate();
  comments.push({ name, comment, date });

  console.log(comments);
  response.end(guestBookHtml(comments));
  return;
};

module.exports = { handleGuestBook };