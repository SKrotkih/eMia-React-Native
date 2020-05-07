import * as api from './api'
const {
  fetchAllUsers,
  fetchAllPosts
} = api

export function fetchUsers (completion, failed) {
  return (dispatch) => {
    fetchAllUsers(function (data, error) {
      if (data.items === null) {
        failed(error)
      } else {
        completion(data.items)
      }
    })
  }
}

export function fetchPosts (completion, failed) {
  return (dispatch) => {
    fetchAllPosts(function (data, error) {
      if (data.items === null) {
        failed(error)
      } else {
        completion(data.items)
      }
    })
  }
}
