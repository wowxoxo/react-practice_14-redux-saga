const repository = new UserRepository();
repository.save(user);

AdminRepository();
MemberRepository();

const db = new MySQLDB({});
db.config("ds");

// dependency inversion
const createRepository = (userData, repository) => {
  const user = new User(userData);
  repository.save(user);
};

const rep1 = createRepository({}, adminRepository);

// dependency injection container

class EmailService {
  constructor(sender) {
    this.sender = sender;
  }
  sendEmail(subject, body) {
    const email = new Email(subject, body);
    this.sender.send(email);
  }
}

//
const bottle = new Bottle();
// service registration
bottle.service("emailSender", EmailSender);
bottle.service("emailService", "EmailSender");

//
const { emailService } = bottle.container;

emailService.sendEmail("title", "body");
