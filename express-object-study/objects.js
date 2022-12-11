// create a user class  and export to express app

class UserCreator {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  increment() {
    this.score++;
  }

  decrement() {
    this.score--;
  }

  changeName(name) {
    this.name = name;
  }
}

module.exports = { UserCreator };
