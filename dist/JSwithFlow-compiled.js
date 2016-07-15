'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IUserRepository = function () {
  function IUserRepository(input) {
    return input != null && typeof input.findByUserName === 'function';
  }

  ;
  Object.defineProperty(IUserRepository, Symbol.hasInstance, {
    value: function value(input) {
      return IUserRepository(input);
    }
  });
  return IUserRepository;
}();

/*****************************************************************************
 * UserRepo Model which implements IUserRepository interface
 ****************************************************************************/


var UserRepo = function (_IUserRepository) {
  _inherits(UserRepo, _IUserRepository);

  function UserRepo() {
    _classCallCheck(this, UserRepo);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserRepo).call(this));

    _this._users = {};
    return _this;
  }

  _createClass(UserRepo, [{
    key: 'findByUserName',
    value: function findByUserName(username) {
      function _ref(_id) {
        if (!(_id == null || _id instanceof User)) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\n?User\n\nGot:\n' + _inspect(_id));
        }

        return _id;
      }

      if (!(typeof username === 'string')) {
        throw new TypeError('Value of argument "username" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(username));
      }

      return _ref(this._users[username] ? this._users[username] : null);
    }
  }, {
    key: 'addUser',
    value: function addUser(email, generator) {
      if (!(typeof email === 'string')) {
        throw new TypeError('Value of argument "email" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(email));
      }

      if (!(generator instanceof UserNameGenerator)) {
        throw new TypeError('Value of argument "generator" violates contract.\n\nExpected:\nUserNameGenerator\n\nGot:\n' + _inspect(generator));
      }

      var username = generator.generate(email, this);
      var newUser = new User();
      newUser.setEmail(email);
      newUser.setUsername(username);
      console.log('New user has been added!!');
      console.log('Email : ' + email);
      console.log('Username : ' + username);
      this._users[username] = newUser;
    }
  }]);

  return UserRepo;
}(IUserRepository);

/*****************************************************************************
 * User Model which contains email and username
 ****************************************************************************/


var User = function () {
  function User() {
    _classCallCheck(this, User);

    this._email = null;

    if (!(this._email == null || typeof this._email === 'string')) {
      throw new TypeError('Value of "this._email" violates contract.\n\nExpected:\n?string\n\nGot:\n' + _inspect(this._email));
    }

    this._username = null;

    if (!(this._username == null || typeof this._username === 'string')) {
      throw new TypeError('Value of "this._username" violates contract.\n\nExpected:\n?string\n\nGot:\n' + _inspect(this._username));
    }
  }

  _createClass(User, [{
    key: 'setEmail',
    value: function setEmail(value) {
      if (!(typeof value === 'string')) {
        throw new TypeError('Value of argument "value" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(value));
      }

      this._email = value;
    }
  }, {
    key: 'getEmail',
    value: function getEmail() {
      function _ref3(_id3) {
        if (!(_id3 == null || typeof _id3 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\n?string\n\nGot:\n' + _inspect(_id3));
        }

        return _id3;
      }

      return _ref3(this._email);
    }
  }, {
    key: 'setUsername',
    value: function setUsername(value) {
      if (!(typeof value === 'string')) {
        throw new TypeError('Value of argument "value" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(value));
      }

      this._username = value;
    }
  }, {
    key: 'getUsername',
    value: function getUsername() {
      function _ref5(_id5) {
        if (!(_id5 == null || typeof _id5 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\n?string\n\nGot:\n' + _inspect(_id5));
        }

        return _id5;
      }

      return _ref5(this._username);
    }
  }]);

  return User;
}();

/*****************************************************************************
 * UserNameGenerator Model
 ****************************************************************************/


var UserNameGenerator = function () {
  function UserNameGenerator() {
    _classCallCheck(this, UserNameGenerator);
  }

  _createClass(UserNameGenerator, [{
    key: 'generate',
    value: function generate(email, userRepo) {
      if (!(typeof email === 'string')) {
        throw new TypeError('Value of argument "email" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(email));
      }

      if (!IUserRepository(userRepo)) {
        throw new TypeError('Value of argument "userRepo" violates contract.\n\nExpected:\nIUserRepository\n\nGot:\n' + _inspect(userRepo));
      }

      // Regex for email validation
      var emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/ig;

      // arguments validation
      if (!emailReg.test(email)) {
        throw new Error('Wrong arguments');
      }

      // extract local part from given email
      var username = email.split('@')[0];

      // checking email availability
      while (userRepo.findByUserName(username) !== null) {
        username = username + username[Math.floor(Math.random() * username.length)];
      }
      return username;
    }
  }]);

  return UserNameGenerator;
}();

function _inspect(input, depth) {
  var maxDepth = 4;
  var maxKeys = 15;

  if (depth === undefined) {
    depth = 0;
  }

  depth += 1;

  if (input === null) {
    return 'null';
  } else if (input === undefined) {
    return 'void';
  } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return typeof input === 'undefined' ? 'undefined' : _typeof(input);
  } else if (Array.isArray(input)) {
    if (input.length > 0) {
      var _ret = function () {
        if (depth > maxDepth) return {
            v: '[...]'
          };

        var first = _inspect(input[0], depth);

        if (input.every(function (item) {
          return _inspect(item, depth) === first;
        })) {
          return {
            v: first.trim() + '[]'
          };
        } else {
          return {
            v: '[' + input.slice(0, maxKeys).map(function (item) {
              return _inspect(item, depth);
            }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
          };
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return 'Array';
    }
  } else {
    var keys = Object.keys(input);

    if (!keys.length) {
      if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
        return input.constructor.name;
      } else {
        return 'Object';
      }
    }

    if (depth > maxDepth) return '{...}';
    var indent = '  '.repeat(depth - 1);
    var entries = keys.slice(0, maxKeys).map(function (key) {
      return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
    }).join('\n  ' + indent);

    if (keys.length >= maxKeys) {
      entries += '\n  ' + indent + '...';
    }

    if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
      return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
    } else {
      return '{\n  ' + indent + entries + '\n' + indent + '}';
    }
  }
}
