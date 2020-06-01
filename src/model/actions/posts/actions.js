import {fetchAllPosts} from '@model/firebase/database/posts';

export function fetchPosts() {
    return fetchAllPosts();
}
