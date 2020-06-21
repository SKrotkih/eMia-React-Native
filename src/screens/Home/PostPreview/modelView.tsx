// Post preview Model View
import {Post} from '../../../model/entities/post';
import {User} from '../../../model/entities/user';

export class ModelView {
  private _post: Post;
  private _author: User;
  private readonly _avatarUrl: string;
  private readonly _imageUrl: string;

  constructor(postItem) {
    this._post = postItem.post;
    this._author = postItem.author;
    this._avatarUrl = postItem.avatarUrl;
    this._imageUrl = postItem.imageUrl;
  }

  get title(): string {
    return this._post.title;
  }

  get body(): string {
    return this._post.body;
  }

  get avatarUrl(): {} {
    let avatarUrl = this._avatarUrl;
    if (avatarUrl === null) {
      return {uri: 'Icon-Profile'};
    } else {
      return {uri: avatarUrl};
    }
  }

  get imageUrl(): {} {
    let imageUrl = this._imageUrl;
    if (imageUrl === null) {
      return {uri: 'Icon-Profile'};
    } else {
      return {uri: imageUrl};
    }
  }

  get publishedAt(): Date {
    return new Date(1000 * this._post.created);
  }

  get userName(): string {
    return this._author.username == null ? '' : this._author.username;
  }
}
