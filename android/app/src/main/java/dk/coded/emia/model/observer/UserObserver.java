package dk.coded.emia.model.observer;

import android.content.Context;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;

import java.util.ArrayList;
import java.util.List;

import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.utils.ProgressBarHandler;

/**
 * Created by oldman on 11/30/17.
 */

public class UserObserver {

    private static volatile UserObserver sDefaltInstance;

    private ChildEventListener mChildEventListener;
    private DatabaseReference mDatabaseReference;

    private Boolean mIsFetchingData = false;
    private DatabaseInteractor mInteractor;
    private List<User> mUserItems;
    private List<UserObserverProtocol> mObservers;

    private final Object MUTEX = new Object();

    // One Syngleton instance
    public static UserObserver getInstance() {
        if (sDefaltInstance == null) { //if there is no instance available... create new one
            synchronized (UserObserver.class) {
                if (sDefaltInstance == null) {
                    sDefaltInstance = new UserObserver();
                }
            }
        }

        return sDefaltInstance;
    }

    private UserObserver() {
        mUserItems = new ArrayList<>();
        mObservers = new ArrayList<>();
        mInteractor = DatabaseFactory.getDatabaseInteractor();
    }

    public void register(UserObserverProtocol observer, Context context) {
        if (observer == null) {
            throw new NullPointerException("Null Observer");
        }

        synchronized (MUTEX) {
            if (!mObservers.contains(observer)) {
                mObservers.add(observer);
            }
            startListening(observer, context);
        }
    }

    public void unregister(UserObserverProtocol observer) {
        synchronized (MUTEX) {
            mObservers.remove(observer);
        }
    }

    private void startListening(UserObserverProtocol observer, Context context) {
        if (mUserItems.size() == 0) {
            if (mIsFetchingData) {
                return;
            }
            mIsFetchingData = true;
            final ProgressBarHandler progress = new ProgressBarHandler(context);
            progress.show();
            Runnable r = () -> {
                mInteractor.getAllUsers((int status, Object data) -> {
                    progress.hide();
                    ArrayList<User> users = (ArrayList<User>) data;
                    for (User item: users) {
                        addToUserItems(item);
                    }
                    startListening();
                    for (UserObserverProtocol observerItem : mObservers) {
                        observerItem.updateUsers(mUserItems);
                    }
                    mIsFetchingData = false;
                });
            };
            new Thread(r).start();
        } else {
            observer.updateUsers(mUserItems);
        }
    }

    private void notifyObservers() {
        List<UserObserverProtocol> observersLocal = null;
        synchronized (MUTEX) {
            observersLocal = new ArrayList<>(mObservers);
        }
        for (UserObserverProtocol observer : observersLocal) {
            observer.updateUsers(mUserItems);
        }
    }

    private User addToUserItems(User user) {
        String id = user.id;
        Boolean isPresented = false;
        for(User item : mUserItems){
            if(item.id.equals(id)) {
                isPresented = true;
                break;
            }
        }
        if (isPresented == false) {
            mUserItems.add(user);
            return user;
        } else {
            return null;
        }
    }

    private void startListening() {
        registerServerObserver(new UserObserverCallback() {

            @Override
            public void addUser(User post){
                User item = addToUserItems(post);
                if (item == null) {
                    return;
                }
                List<UserObserverProtocol> observersLocal = null;
                synchronized (MUTEX) {
                    observersLocal = new ArrayList<>(mObservers);
                }
                for (UserObserverProtocol observer : observersLocal) {
                    observer.newUser(item);
                }
            }

            @Override
            public void updateUser(User user){

            }

            @Override
            public void deleteUser(String id){

            }

            @Override
            public void moveUser(User user){

            }

            @Override
            public void cancelled(DatabaseError databaseError){

            }
        });
    }

    private void registerServerObserver(final UserObserverCallback callback) {
        mDatabaseReference = mInteractor.dataBaseRef().child("users");

        // Create child event listener
        // [START child_event_listener_recycler]
        ChildEventListener childEventListener = new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String previousChildName) {
                // A new user has been added
                User user = dataSnapshot.getValue(User.class);
                callback.addUser(user);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String previousChildName) {
                // A user has changed
                User newUser = dataSnapshot.getValue(User.class);
                callback.updateUser(newUser);
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                // A comment has changed
                String userKey = dataSnapshot.getKey();
                callback.deleteUser(userKey);
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String previousChildName) {
                // A comment has changed position
                User movedUser = dataSnapshot.getValue(User.class);
                callback.moveUser(movedUser);
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
