/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {PostsApi} from '../../network/interfaces';

export function fetchPosts(tabIndex: number): Promise<[Post]> {
  if (tabIndex === 0) {
    return PostsApi().fetchAllPosts();
  } else {
    return PostsApi().fetchMyPosts();
  }
}
