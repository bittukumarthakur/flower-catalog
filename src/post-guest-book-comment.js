const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

const postGuestBookComment = (request, response) => {
  let body = "";

  request.on("data", (data) => {
    body += data;
  });

  request.on("end", () => {
    const { name, comment } = JSON.parse(body);
    const { commentRepository } = request.context;
    const date = new Date();
    const commentLine = { name: capitalizeWord(name), comment, date };

    commentRepository.save(commentLine);
    response.writeHead(201);
    response.end();
  });
};

module.exports = {
  postGuestBookComment,
};