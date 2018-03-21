package dk.coded.emia.model.observer;

import com.google.firebase.database.DatabaseError;

import dk.coded.emia.model.Data.Post;

/**
 * Created by oldman on 11/30/17.
 */

public interface PostObserverCallback {

    void addPost(Post post);
    void updatePost(Post post);
    void deletePost(String id);
    void movePost(Post post);
    void cancelled(DatabaseError databaseError);

}
