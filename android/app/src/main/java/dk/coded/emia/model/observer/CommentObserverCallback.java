package dk.coded.emia.model.observer;

import com.google.firebase.database.DatabaseError;

import dk.coded.emia.model.Data.Comment;

/**
 * Created by oldman on 11/30/17.
 */

public interface CommentObserverCallback {

    void addComment(Comment comment, String id);
    void updateComment(Comment comment, String id);
    void deleteComment(String id);
    void moveComment(Comment comment, String id);
    void cancelled(DatabaseError databaseError);

}
