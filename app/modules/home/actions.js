import * as api from './api';
const {
  fetchAllUsers
} = api;

export function fetchUsers (completion, failed) {
  return (dispatch) => {
    fetchAllUsers(function (data, error) {
      if (data.items === null) {
        failed(error);
      } else {
        completion(data.items);
      }
    });
  };
}
