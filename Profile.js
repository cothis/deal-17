export class Profile {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  hello() {
    return `Hello, ${this.name}(${this.email})`;
  }
}
