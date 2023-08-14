const generateCommentsElement = (comments) => {
  return comments.map(({ name, date, comment }) => {
    const nameElement = createElement("td", name, "name");
    const commentElement = createElement("td", comment, "comment");
    const DateElement = createElement("td", date.toLocaleString(), "date");
    const commentLine = `${DateElement}\n${nameElement}\n${commentElement}`;
    return createElement("tr", commentLine);
  });
};

const createElement = (tagName, innerText, className = "") => {
  return `<${tagName} class="${className}">${innerText}</${tagName}>`
};

module.exports = { generateCommentsElement };