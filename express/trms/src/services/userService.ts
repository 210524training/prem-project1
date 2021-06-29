import User from '../models/user';
import UserDAO from '../DAO/userDAO';
import { PasswordDoesNotMatchError, UserNotFoundError } from '../error/errors';

export class UserService {
  constructor(
    public users = UserDAO,
  ) {}

  async checkLogin(username: string, password: string): Promise<User> {
    const found = await this.users.findByUsername(username);
    if(!found) {
      throw new UserNotFoundError();
    }
    if(found.password !== password) {
      throw new PasswordDoesNotMatchError();
    }
    return found;
  }

  addUser(user: User): Promise<boolean> {
    return this.users.addUser(new User(
      user.username,
      user.password,
      'Employee',
      user.email,
      [],
      1000,
      0,
    ));
  }

  findByUsername(username: string): Promise<User | undefined> {
    return this.users.findByUsername(username);
  }

  update(user: User): Promise<boolean> {
    console.log(user);
    console.log(user.availableAmount);
    console.log(user.pendingAmount);
    return this.users.update(user);
  }

  delete(username: string): Promise<boolean> {
    return this.users.delete(username);
  }
}

export default new UserService();
