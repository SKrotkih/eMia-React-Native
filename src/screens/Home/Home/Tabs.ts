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
