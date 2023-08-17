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
  Array.from(commentContainer.children).forEach(comment => commentContainer.removeChild(comment));
  commentContainer.append(...commentElements);
};

const getComment = () => {
  const formElement = document.querySelector("form");
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
};

const loadComments = () => {
  fetch("/guest-book/comments")
    .then((res) => res.json())
    .then(displayComments);
};

const postComment = (event) => {
  event.preventDefault();
  const comment = getComment();
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment)
  };

  fetch("/guest-book/comments", options)
    .then(loadComments);
};

const main = () => {
  const submitButton = document.querySelector("button[type=submit]");
  submitButton.onclick = postComment;
  loadComments();
};

window.onload = main;
