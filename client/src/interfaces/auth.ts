interface ISignup {
  name: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

export type { ISignup, ILogin };
