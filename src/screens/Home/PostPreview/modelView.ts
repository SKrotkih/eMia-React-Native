/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {PostItemModel} from '../../../model/network/interfaces';

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
    if (avatarUrl === null) {
      return {uri: 'Icon-Profile'};
    } else {
      return {uri: avatarUrl};
    }
  }

  get imageUrl(): {} {
    let imageUrl = this.postModel.imageUrl;
    if (imageUrl === null) {
      return {uri: 'Icon-Profile'};
    } else {
      return {uri: imageUrl};
    }
  }

  get publishedAt(): Date {
    if (this.postModel.post.created) {
      if (typeof this.postModel.post.created === 'string') {
        return new Date(this.postModel.post.created);
      } else {
        return new Date(1000 * this.postModel.post.created);
      }
    } else {
      return new Date(null);
    }
  }

  get userName(): string {
    if (this.postModel.author) {
      return this.postModel.author.username === null ? '' : this.postModel.author.username;
    } else {
      return '';
    }
  }
}
