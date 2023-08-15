class storage {
  #readFile;
  #writeFile;
  #comments;
  #filePath;

  constructor(readFile, writeFile) {
    this.#readFile = readFile;
    this.#writeFile = writeFile;
    this.#comments = [];
    this.#filePath = "./resources/users-message.json";
  }

  loadMessages() {
    const rawMessages = readFileSync(this.#filePath, "utf-8");
    this.#comments = JSON.parse(rawMessages);

  }

  saveMessage(message) {
    this.#comments.push(message);

    this.#writeFile(this.#filePath, JSON.stringify(this.#comments, null, 2), (error) => {
      console.log("Error in saving comment:", error);
    });
  }

  getMessages() {
    return this.#comments;
  }
}