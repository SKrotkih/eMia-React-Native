import {User} from "../entities/user";
import {UsersDBInteractor as FirebaseDBInteractor} from "./firebase/UsersDBInteractor";
import {UsersDBInteractor as ServerDBInteractor} from "./server/UsersDBInteractor";
import {PostsDBInteractor as FirebasePostsDBInteractor} from "./firebase/PostsDBInteractor";
import {PostsDBInteractor as ServerPostsDBInteractor} from "./server/PostsDBInteractor";
import {StorageDBInteractor as FirebaseStorageDBInteractor} from "./firebase/StorageDBInteractor";
import {StorageDBInteractor as ServerStorageDBInteractor} from "./server/StorageDBInteractor";
import {Post, PostDocument} from '../entities/post';
import {ImagePickerResponse} from "react-native-image-picker";
import {BackendTypeState, TypeBackend} from "./backend.dispatch.hook";

export interface Credentials {
  email: string;
  password: string;
}

// Users

export interface DBUsersInteractor {
  login(credentials: Credentials): Promise<{}>;

  registerNewUser(credentials: Credentials): Promise<string>;

  resetPassword(email: string): Promise<any>;

  signOut(): Promise<any>;

  isUserAuthenticated(): Promise<boolean>;

  getCurrentUserId(): Promise<string>;

  updateUser(user): Promise<any>;

  getCurrentUser(): Promise<User>;

  getUser(uid: string): Promise<User>;

  fetchAllUsers(): Promise<Array<User>>;

  getUserAvatarURL(uid: string): Promise<string>;
}

// Auth

const firebaseInteractor = new FirebaseDBInteractor();
const serverInteractor = new ServerDBInteractor();

export function AuthApi(): Promise<DBUsersInteractor> {
  return new Promise<DBUsersInteractor>((resolve, reject) => {
    BackendTypeState.getBackend().then((backend) => {
      switch (backend) {
        case TypeBackend.Nodejs:
          resolve(serverInteractor);
          break;
        case TypeBackend.Firebase:
          resolve(firebaseInteractor);
          break;
      }
    });
  });
}

// Posts database Interface

export interface PostItemModel {
  post: Post;
  imageUrl: string;
  avatarUrl: string;
  author: User;
}

// Posts

export interface DBPostsInteractor {
  fetchPosts(uid: string): Promise<PostItemModel[]>;

  fetchMyPosts(): Promise<PostItemModel[]>;

  uploadData(post: PostDocument): Promise<string>;

  assignImagesUrl(items: PostItemModel[]): Promise<PostItemModel[]>;

  getImageURL(postId: string): Promise<string>;
}

const firebasePostsInteractor = new FirebasePostsDBInteractor();
const serverPostsInteractor = new ServerPostsDBInteractor();

export function PostsApi(): Promise<DBPostsInteractor> {
  return new Promise<DBPostsInteractor>((resolve, reject) => {
    BackendTypeState.getBackend().then((backend) => {
      switch (backend) {
        case TypeBackend.Nodejs:
          resolve(serverPostsInteractor);
          break;
        case TypeBackend.Firebase:
          resolve(firebasePostsInteractor);
          break;
      }
    });
  });
}

// Storage

export interface DBStorageInteractor {
  uploadImage(photo: ImagePickerResponse, id: string): Promise<string>;
}

const firebaseStorageInteractor = new FirebaseStorageDBInteractor();
const serverStorageInteractor = new ServerStorageDBInteractor();

export function StorageApi(): Promise<DBStorageInteractor> {
  return new Promise<DBStorageInteractor>((resolve, reject) => {
    BackendTypeState.getBackend().then((backend) => {
      switch (backend) {
        case TypeBackend.Nodejs:
          resolve(serverStorageInteractor);
          break;
        case TypeBackend.Firebase:
          resolve(firebaseStorageInteractor);
          break;
      }
    });
  });
}
