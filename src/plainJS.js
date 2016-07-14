/*****************************************************************************
 * User Model which contains email and username
 ****************************************************************************/
var User = function() {
  this._email = null;
  this._username = null;
}

User.prototype.getEmail = function() {
  return this._email;
};
User.prototype.setEmail = function(email) {
  this._email = email;
};
User.prototype.getUsername = function() {
  return this._username;
};
User.prototype.setUsername = function(username) {
  this._username = username;
};

/*****************************************************************************
 * UserRepo Model which contains an object that consist of user instance
 ****************************************************************************/
var UserRepo = function() {
  this._user = {};
}

/*
 * Method for searching user with username
 * @param username<string> - username that is used to find user
 * @return <null> or <user instance>
 */
UserRepo.prototype.findByUserName = function(username) {
  return this._user[username] ? this._user[username] : null;
};

/*
 * Method for adding user with email
 * @param email<string> - username that is used to add user
 * @param generator<UserNameGenerator> - instance of UserNameGenerator class
 * @return <undefined>
 */
UserRepo.prototype.addUser = function(email, generator) {
  var username = generator.generate(email, this);
  var newUser = new User();
  newUser.setEmail(email);
  newUser.setUsername(username);
  console.log('New user has been added!!');
  console.log('Email : ' + email);
  console.log('Username : ' + username);
  this._user[username] = newUser;
}

/*****************************************************************************
 * UserNameGenerator Model
 ****************************************************************************/
var UserNameGenerator = function() {};

/*
 * Method for generation username with email info
 * @param email<string> - email that is used to create username
 * @param userRepo<UserRepo> - instance of UserRepo class
 * @return <string>
 */
UserNameGenerator.prototype.generate = function(email, userRepo) {
  // Regex for email validation
  var emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/ig;

  // arguments validation
  if(userRepo instanceof UserRepo === false || !emailReg.test(email)) {
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
