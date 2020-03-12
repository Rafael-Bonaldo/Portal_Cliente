export class User {
  password: string;
  fullName: string;
  login: string;
  email: string;
  cpf: string;
  phone: string;
  photo?: string;
  blocked?: boolean;
  firebaseId?: string;
  id?: string;
}

export class AuthUser {
  login: string;
  password: string;
}

export class AuthToken {
  token: string;
}