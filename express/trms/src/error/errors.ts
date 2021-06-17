/* eslint-disable max-classes-per-file */
export class UserNotFoundError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class UsernameDoesNotMatchError extends UserNotFoundError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, UsernameDoesNotMatchError.prototype);
  }
}

export class AuthenticationError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class PasswordDoesNotMatchError extends AuthenticationError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, PasswordDoesNotMatchError.prototype);
  }
}
