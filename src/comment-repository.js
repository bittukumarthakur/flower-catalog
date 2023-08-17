class CommentRepository {
  #writeFile;
  #comments;
  #filePath;

  constructor(comments, writeFile) {
    this.#writeFile = writeFile;
    this.#comments = comments;
    this.#filePath = "./resources/comments.json";
  }

  save(message) {
    this.#comments.unshift(message);
    this.#writeFile(this.#filePath, JSON.stringify(this.#comments, null, 2), (error) => {
      if (error) console.log("Error in saving comment:", error);
    });
  }

  get() {
    return [...this.#comments];
  }
}

module.exports = { CommentRepository };