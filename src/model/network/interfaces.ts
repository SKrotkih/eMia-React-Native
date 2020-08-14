import {User} from "../entities/user";
import {MODEL_TYPE_SERVER, MODEL_TYPE, MODEL_TYPE_FIREBASE} from '../../config/constants';
import {UsersDBInteractor as FirebaseDBInteractor} from "./firebase/UsersDBInteractor";
import {UsersDBInteractor as ServerDBInteractor} from "./server/UsersDBInteractor";

export interface Credentials {
  email: string;
  password: string;
}

export interface DBInteractor {
  login(credentials: Credentials): Promise<{}>;
  registerNewUser(credentials: Credentials): Promise<string>;
  resetPassword(email: string): Promise<any>;
  signOut(): Promise<any>;
  isUserAuthenticated(): Promise<boolean>;
  getCurrentUserAsync(): Promise<User>;
  fetchUserData(uid: string): Promise<User>;
  getFirebaseUserId(): Promise<string>;
}

const firebaseInteractor = new FirebaseDBInteractor();
const serverInteractor = new ServerDBInteractor();

export function AuthApi(): DBInteractor {
  if (MODEL_TYPE === MODEL_TYPE_SERVER) {
    return serverInteractor;
  } else if (MODEL_TYPE === MODEL_TYPE_FIREBASE) {
    return firebaseInteractor;
  }
}
