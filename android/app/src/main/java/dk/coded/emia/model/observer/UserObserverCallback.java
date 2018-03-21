package dk.coded.emia.model.observer;

import com.google.firebase.database.DatabaseError;

import dk.coded.emia.model.Data.User;

/**
 * Created by oldman on 11/30/17.
 */

public interface UserObserverCallback {

    void addUser(User user);
    void updateUser(User user);
    void deleteUser(String id);
    void moveUser(User user);
    void cancelled(DatabaseError databaseError);

}
