const createElement = (tagName, innerText, className = "") => {
  const element = document.createElement(tagName);
  element.innerText = innerText;
  element.classList.add(className);
  return element;
};

const createCommentElement = ({ name, comment, date }) => {
  const localDate = new Date(date).toLocaleString();
  const nameElement = createElement("td", name, "name");
  const commentElement = createElement("td", comment, "comment");
  const DateElement = createElement("td", localDate, "date");
  const commentLine = document.createElement("tr");
  commentLine.append(DateElement, nameElement, commentElement);
  return commentLine;
};

const createCommentElements = (comments) => {
  return comments.map(createCommentElement);
};

const displayComments = (comments) => {
  const commentElements = createCommentElements(comments);
  const commentContainer = document.querySelector("#comment-container");
  commentContainer.append(...commentElements);
};

const main = () => {
  fetch("/guest-book/comments")
    .then((res) => res.json())
    .then(displayComments);
};

window.onload = main;