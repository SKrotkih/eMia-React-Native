package dk.coded.emia.model.observer;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;

import dk.coded.emia.model.Data.Comment;
import dk.coded.emia.model.interactor.DatabaseFactory;

/**
 * Created by oldman on 11/30/17.
 */

public class CommentObserver {

    private ChildEventListener mChildEventListener;
    private DatabaseReference mDatabaseReference;

    public void addObserver(final String mPostKey, final CommentObserverCallback callback) {

        DatabaseReference dataBaseRef = DatabaseFactory.getDatabaseInteractor().dataBaseRef();
        mDatabaseReference = dataBaseRef.child("comments").child(mPostKey);

        // Create child event listener
        // [START child_event_listener_recycler]
        ChildEventListener childEventListener = new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String previousChildName) {
                // A new comment has been added
                Comment comment = dataSnapshot.getValue(Comment.class);
                callback.addComment(comment, dataSnapshot.getKey());
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String previousChildName) {
                // A comment has changed
                Comment newComment = dataSnapshot.getValue(Comment.class);
                String commentKey = dataSnapshot.getKey();
                callback.updateComment(newComment, commentKey);
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                // A comment has changed
                String commentKey = dataSnapshot.getKey();
                callback.deleteComment(commentKey);
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String previousChildName) {
                // A comment has changed position
                Comment movedComment = dataSnapshot.getValue(Comment.class);
                String commentKey = dataSnapshot.getKey();
                callback.moveComment(movedComment, commentKey);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                callback.cancelled(databaseError);
            }
        };
        mDatabaseReference.addChildEventListener(childEventListener);
        // [END child_event_listener_recycler]

        // Store reference to listener so it can be removed on app stop
        mChildEventListener = childEventListener;
    }

    public void unregisterServerObserver() {
        if (mChildEventListener != null) {
            mDatabaseReference.removeEventListener(mChildEventListener);
        }
    }
}
