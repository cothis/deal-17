export class Profile {
  name: string;
  email: string;
  
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  hello() {
    return `Hello, ${this.name}(${this.email})`;
  }
}
