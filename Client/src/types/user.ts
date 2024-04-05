export interface loginData {
  username: string;
  password: string;
}

export interface signupData {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface tokenData {
  id: string;
  username: string;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}
