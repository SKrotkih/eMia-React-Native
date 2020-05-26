import {fetchAllPosts} from '@model/firebase/database/api';

export function fetchPosts(completion, failed) {
  return (dispatch) => {
    fetchAllPosts(function (data, error) {
      if (data.items === null) {
        failed(error);
      } else {
        completion(data.items);
      }
    });
  };
}
