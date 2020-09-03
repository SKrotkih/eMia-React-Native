/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */
import {User} from "../../entities/user";
import {Post, PostDocument} from '../../entities/post';

export interface PostItemModel {
  post: Post;
  imageUrl: string;
  avatarUrl: string;
  author: User;
}

export interface DBPostsInteractor {
  fetchPosts(uid: string): Promise<PostItemModel[]>;
  fetchMyPosts(): Promise<PostItemModel[]>;
  uploadData(post: PostDocument): Promise<string>;
  assignImagesUrl(items: PostItemModel[]): Promise<PostItemModel[]>;
  getImageURL(postId: string): Promise<string>;
}
