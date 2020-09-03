import {User} from "../../../model/entities/user";

export enum ServerType {
  Firebase,
  Server,
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResults {
  uid: string;
  user: User;
}

export type LoginFunction = (credentials: LoginCredentials) => void;
