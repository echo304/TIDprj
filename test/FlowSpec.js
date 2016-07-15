var expect = chai.expect;

describe('Flowtype JavaScript', function() {
  var newUser;
  var userRepo;
  var userNameGenerator;

  beforeEach(function() {
    newUser = new User();
    userRepo = new UserRepo();
    userNameGenerator = new UserNameGenerator();
  });

  describe('User Class', function() {

    it('should store email properly', function() {
      newUser.setEmail('test@test.com');
      expect(newUser.getEmail()).to.equal('test@test.com');
    });
    it('should store username properly', function() {
      newUser.setUsername('test');
      expect(newUser.getUsername()).to.equal('test');
    });
  });

  describe('UserRepo Class', function() {

    it('should implement IUserRepository interface', function() {
      expect(userRepo instanceof IUserRepository).to.equal(true);
    });

    it('should have findByUserName method, addUser method', function() {
      expect(userRepo).to.have.property('findByUserName');
      expect(userRepo.findByUserName).to.be.a('function');
      expect(userRepo).to.have.property('addUser');
      expect(userRepo.addUser).to.be.a('function');
    });

    describe('findByUserName method', function() {
      it('should return an instance of User class if it exists', function() {
        userRepo.addUser('test@test.com', userNameGenerator);
        expect(userRepo.findByUserName('test')).to.be.an.instanceof(User);
      });
      it('should return null if it doesn\'t exist', function() {
        expect(userRepo.findByUserName('whatever')).to.equal(null);
      });
    });

    describe('addUser method', function() {
      it('should add user to userRepo instance', function() {
        userRepo.addUser('test1@test.com', userNameGenerator);
        var keys = [];
        for(var key in userRepo._users) {
          keys.push(key);
        }
        expect(keys.length).to.equal(1);
        expect(keys[0]).to.equal('test1');
      });
    });
  });

  describe('UserNameGenerator Class', function() {

    it('should have generate method', function() {
      expect(userNameGenerator).to.have.property('generate');
      expect(userNameGenerator.generate).to.be.a('function');
    })
    describe('generate method', function() {
      it('should throw error if first parameter is not valid email', function() {
        var func = function() {
          userNameGenerator.generate('test@tet', userRepo)
        };
        expect(func).to.throw('Wrong arguments');
      });
      it('should throw error if second parameter is not instance of UserRepo', function() {
        var func = function() {
          userNameGenerator.generate('test@tet.com', newUser)
        };
        expect(func).to.throw();
      });
      it('should return username extracted from given email', function() {
        var username = userNameGenerator.generate('test@test.com', userRepo);
        expect(username).to.equal('test');
      });
      it('should add random character to username if initially extracted username already exists', function() {
        userRepo.addUser('test@test.com', userNameGenerator);
        var username = userNameGenerator.generate('test@test.com', userRepo);
        expect(username).to.not.equal('test');
      })
    });
  });
});
