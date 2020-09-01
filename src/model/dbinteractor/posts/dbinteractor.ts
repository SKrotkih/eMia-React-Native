/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {PostItemModel, PostsApi} from '../../network/interfaces';

export function fetchPosts(tabIndex: number): Promise<PostItemModel[]> {
  if (tabIndex === 0) {
    return PostsApi().then((api) => api.fetchPosts(null));
  } else {
    return PostsApi().then((api) => api.fetchMyPosts());
  }
}
