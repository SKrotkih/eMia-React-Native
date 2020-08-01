/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

export enum FilerItem {
  ALL_POSTS,
  MY_POSTS,
}

export class PostsTabItem {
  title: string;
  filterItem: FilerItem;
}

export const PostsTabs: Array<PostsTabItem> = [{title: 'All Posts', filterItem: FilerItem.ALL_POSTS}, {title: 'My Posts', filterItem: FilerItem.MY_POSTS}];
