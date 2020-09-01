/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {AuthApi, PostItemModel} from '../../../model/network/interfaces';

export default class ModelView {
  private postModel: PostItemModel;

  constructor(postModel: PostItemModel) {
    this.postModel = postModel;
  }

  get title(): string {
    return this.postModel.post.title;
  }

  get body(): string {
    return this.postModel.post.body;
  }

  get avatarUrl(): {} {
    let avatarUrl = this.postModel.avatarUrl;
    if (avatarUrl) {
      return {uri: avatarUrl};
    } else {
      return null;
    }
  }

  async getUserAvatar(): Promise<string> {
    return AuthApi().then((api) => api.getUserAvatarURL(this.postModel.post.uid));
  }

  get imageUrl(): {} {
    let imageUrl = this.postModel.imageUrl;
    if (imageUrl) {
      return {uri: imageUrl};
    } else {
      return {uri: 'Icon-Profile'};
    }
  }

  get publishedAt(): Date {
    const createdAt = this.postModel.post.created;
    if (createdAt) {
      if (typeof createdAt === 'string') {
        return new Date(createdAt);
      } else {
        return new Date(1000 * createdAt);
      }
    } else {
      return new Date(null);
    }
  }

  get userName(): string {
    const author = this.postModel.author;
    if (author) {
      return author.username ? author.username : '';
    } else {
      return '';
    }
  }
}
