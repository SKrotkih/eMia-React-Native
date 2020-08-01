/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {fetchAllPosts, fetchMyPosts} from '../../firebase/database/posts';

export function fetchPosts(i) {
  if (i === 0) {
    return fetchAllPosts();
  } else {
    return fetchMyPosts();
  }
}
