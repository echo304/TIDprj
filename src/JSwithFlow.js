// @flow

interface IUserRepository {
  findByUserName(): ?string;
}

/*****************************************************************************
 * UserRepo Model which implements IUserRepository interface
 ****************************************************************************/
class UserRepo extends IUserRepository {
  _users: Object;

  constructor() {
    super();
    this._users = {};
  }

  findByUserName(username: string): ?User {
    return this._users[username] ? this._users[username] : null;
  }

  addUser(email: string, generator: UserNameGenerator) {
    var username = generator.generate(email, this);
    var newUser = new User();
    newUser.setEmail(email);
    newUser.setUsername(username);
    console.log('New user has been added!!');
    console.log('Email : ' + email);
    console.log('Username : ' + username);
    this._users[username] = newUser;
    return username;
  }
}

/*****************************************************************************
 * User Model which contains email and username
 ****************************************************************************/
class User {
  _email: ?string;
  _username: ?string;

  constructor() {
    this._email = null;
    this._username = null;
  }

  setEmail(value: string): void {
    this._email = value;
  };
  getEmail(): ?string {
    return this._email;
  }

  setUsername(value: string): void {
    this._username = value;
  };
  getUsername(): ?string {
    return this._username;
  };
}

/*****************************************************************************
 * UserNameGenerator Model
 ****************************************************************************/
class UserNameGenerator {
  generate(email: string, userRepo: IUserRepository): string {
    // Regex for email validation
    var emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/ig;

    // arguments validation
    if(!emailReg.test(email)) {
      throw new Error('Wrong arguments');
    }

    // extract local part from given email
    var username = email.split('@')[0];

    // checking email availability
    while(userRepo.findByUserName(username) !== null) {
      username = username + username[Math.floor(Math.random() * username.length)];
    }
    return username;
  }
}
