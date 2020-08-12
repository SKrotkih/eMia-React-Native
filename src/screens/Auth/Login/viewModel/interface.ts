import {AuthInputModel} from "../../AuthModel";
import {User} from "../../../../model/entities/user";

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

export interface LoginViewModel {
  action(credentials: LoginCredentials): Promise<LoginResults>;
}
