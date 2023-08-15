class CommentRepository {
  #readFileSync;
  #writeFile;
  #comments;
  #filePath;

  constructor(readFileSync, writeFile) {
    this.#readFileSync = readFileSync;
    this.#writeFile = writeFile;
    this.#comments = [];
    this.#filePath = "./resources/users-message.json";
  }

  load() {
    const rawMessages = this.#readFileSync(this.#filePath, "utf-8");
    this.#comments = JSON.parse(rawMessages);
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