package dk.coded.emia.model.observer;

import android.content.Context;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;

import java.util.ArrayList;
import java.util.List;

import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.utils.ProgressBarHandler;

/**
 * Created by oldman on 11/30/17.
 */

public class PostObserver {

    private static volatile PostObserver sDefaltInstance;

    private ChildEventListener mChildEventListener;
    private DatabaseReference mDatabaseReference;

    private Boolean mIsFetchingData = false;
    private DatabaseInteractor mInteractor;
    private List<Post> mPostItems;
    private List<PostObserverProtocol> mObservers;

    private final Object MUTEX = new Object();

    // One Syngleton instance
    public static PostObserver getInstance() {
        if (sDefaltInstance == null) { //if there is no instance available... create new one
            synchronized (PostObserver.class) {
                if (sDefaltInstance == null) {
                    sDefaltInstance = new PostObserver();
                }
            }
        }

        return sDefaltInstance;
    }

    private PostObserver() {
        mPostItems = new ArrayList<>();
        mObservers = new ArrayList<>();
        mInteractor = DatabaseFactory.getDatabaseInteractor();
    }

    public void register(PostObserverProtocol observer, Context context) {
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

    public void unregister(PostObserverProtocol observer) {
        synchronized (MUTEX) {
            mObservers.remove(observer);
        }
    }

    private void startListening(PostObserverProtocol observer, Context context) {
        if (mPostItems.size() == 0) {
            if (mIsFetchingData) {
                return;
            }
            mIsFetchingData = true;
            final ProgressBarHandler progress = new ProgressBarHandler(context);
            progress.show();
            Runnable r = () -> {
                mInteractor.getAllPosts((int status, Object data) -> {
                    progress.hide();
                    ArrayList<Post> posts = (ArrayList<Post>) data;
                    for (Post item: posts) {
                        addToPostItems(item);
                    }
                    startListening();
                    for (PostObserverProtocol observerItem : mObservers) {
                        observerItem.update(mPostItems);
                    }
                    mIsFetchingData = false;
                });
            };
            new Thread(r).start();
        } else {
            observer.update(mPostItems);
        }
    }

    private void notifyObservers() {
        List<PostObserverProtocol> observersLocal = null;
        synchronized (MUTEX) {
            observersLocal = new ArrayList<>(mObservers);
        }
        for (PostObserverProtocol observer : observersLocal) {
            observer.update(mPostItems);
        }
    }

    private Post addToPostItems(Post post) {
        String id = post.id;
        Boolean isPresented = false;
        for(Post item : mPostItems){
            if(item.id.equals(id)) {
                isPresented = true;
                break;
            }
        }
        if (isPresented == false) {
            mPostItems.add(post);
            return post;
        } else {
            return null;
        }
    }

    private void startListening() {
        registerServerObserver(new PostObserverCallback() {

            @Override
            public void addPost(Post post){
                Post item = addToPostItems(post);
                if (item == null) {
                    return;
                }
                List<PostObserverProtocol> observersLocal = null;
                synchronized (MUTEX) {
                    observersLocal = new ArrayList<>(mObservers);
                }
                for (PostObserverProtocol observer : observersLocal) {
                    observer.newPost(item);
                }
            }

            @Override
            public void updatePost(Post post){

            }

            @Override
            public void deletePost(String id){

            }

            @Override
            public void movePost(Post post){

            }

            @Override
            public void cancelled(DatabaseError databaseError){

            }
        });
    }

    private void registerServerObserver(final PostObserverCallback callback) {
        mDatabaseReference = mInteractor.dataBaseRef().child("posts");

        // Create child event listener
        // [START child_event_listener_recycler]
        ChildEventListener childEventListener = new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String previousChildName) {
                // A new post has been added
                Post post = dataSnapshot.getValue(Post.class);
                callback.addPost(post);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String previousChildName) {
                // A post has changed
                Post newPost = dataSnapshot.getValue(Post.class);
                callback.updatePost(newPost);
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                // A post has changed
                String postKey = dataSnapshot.getKey();
                callback.deletePost(postKey);
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String previousChildName) {
                // A post has changed position
                Post movedPost = dataSnapshot.getValue(Post.class);
                callback.movePost(movedPost);
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
