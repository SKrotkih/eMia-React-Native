import {fetchAllPosts, fetchMyPosts} from '@model/firebase/database/posts';

export function fetchPosts(i) {
  if (i === 0) {
    return fetchAllPosts();
  } else {
    return fetchMyPosts();
  }
}
