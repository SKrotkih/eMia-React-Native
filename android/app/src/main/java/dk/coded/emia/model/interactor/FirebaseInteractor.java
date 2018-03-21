package dk.coded.emia.model.interactor;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import dk.coded.emia.View.activity.SignInActivity;
import dk.coded.emia.model.Data.Comment;
import dk.coded.emia.model.Data.Favorite;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.utils.BasicCallBack;

import static android.content.ContentValues.TAG;
import static dk.coded.emia.utils.Constants.DATABASE_NAME;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.FIREBASE_STORAGE;
import static dk.coded.emia.utils.Constants.SUCCESS;

/**
 * Created by oldman on 11/30/17.
 */

public class FirebaseInteractor implements Serializable, DatabaseInteractor {

    private static volatile FirebaseInteractor sDefaltInstance;

    // [START declare_database_ref]
    private DatabaseReference mDatabase;
    // [END declare_database_ref]

    private DatabaseReference mPostReference;
    private ValueEventListener mPostListener;

    //private constructor.
    private FirebaseInteractor(){

        //Prevent form the reflection api.
        if (sDefaltInstance != null){
            throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
        }
    }

    // One Syngleton instance
    public static FirebaseInteractor getInstance() {
        if (sDefaltInstance == null) { //if there is no instance available... create new one
            synchronized (FirebaseInteractor.class) {
                if (sDefaltInstance == null) sDefaltInstance = new FirebaseInteractor();
            }
        }

        return sDefaltInstance;
    }

    //Make singleton from serialize and deserialize operation.
    protected FirebaseInteractor readResolve() {
        return getInstance();
    }

    public DatabaseReference dataBaseRef() {
        if (mDatabase == null) {
            // [START initialize_database_ref]
            mDatabase = FirebaseDatabase.getInstance().getReference().child(DATABASE_NAME);
            // [END initialize_database_ref]
        }
        return mDatabase;
    }

    private FirebaseUser currentUser() {
        FirebaseUser currentUser = FirebaseAuth.getInstance().getCurrentUser();
        return currentUser;
    }

    public String getCurrentUserId() {
        return currentUser().getUid();
    }

    public String getCurrentUserEmail() {
        return currentUser().getEmail();
    }

    // Sign Up, Sign In

    public Boolean isUserSignedIn() {
        return (currentUser() != null);
    }

    public void signIn(String email, String password, Activity acrtivity, final BasicCallBack collback) {
        FirebaseAuth.getInstance().signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(acrtivity, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        Log.d(TAG, "signIn:onComplete:" + task.isSuccessful());
                        if (task.isSuccessful()) {
                            saveToken();
                            collback.callBack(SUCCESS, task.getResult().getUser());
                        } else {
                            collback.callBack(FAIL, null);
                        }
                    }
                });
    }

    public void signUp(String email, String password, Activity acrtivity, final BasicCallBack collback) {
        FirebaseAuth.getInstance().createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(acrtivity, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        Log.d(TAG, "createUser:onComplete:" + task.isSuccessful());
                        if (task.isSuccessful()) {
                            saveToken();
                            collback.callBack(SUCCESS, task.getResult().getUser());
                        } else {
                            collback.callBack(FAIL, null);
                        }
                    }
                });
    }

    public void logOut() {
        FirebaseAuth.getInstance().signOut();
    }

    private void saveToken() {
        currentUser((int status, Object data) -> {
            if (status == SUCCESS) {
                User user = (User) data;
                String currentToken = FirebaseInstanceId.getInstance().getToken();
                if (user.getTokenAndroid() == null) {
                    user.setTokenAndroid(currentToken);
                    updateUser(user, (updatestatus, updateddata) -> {
                    });
                } else if (!user.getTokenAndroid().equals(currentToken) || user.getTokenAndroid().isEmpty()) {
                    user.setTokenAndroid(currentToken);
                    updateUser(user, (updatestatus, updateddata) -> {
                    });
                }
            } else if (status == FAIL) {
            }
        });
    }

    // Public methods

    public void getAllUsers(final BasicCallBack collback) {
        DatabaseReference usersRef = dataBaseRef().child("users");
        usersRef.addListenerForSingleValueEvent( new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ArrayList<User> users = new ArrayList<>();
                if (dataSnapshot.hasChildren()) {
                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
                        users.add(ds.getValue(User.class));
                    }
                }
                collback.callBack(SUCCESS, users);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                collback.callBack(SUCCESS, new ArrayList<>());
            }
        });
    }

    public void addUser(User user) {
        DatabaseReference dbRef = dataBaseRef().child("users").child(user.id);
        dbRef.setValue(user);
    }

    public void updateUser(final User user, final BasicCallBack callback) {
        Map<String, Object> userValues = user.toMap();
        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("/users/" + user.id, userValues);
        dataBaseRef().updateChildren(childUpdates);
        callback.callBack(SUCCESS, null);
    }

    public void currentUser(final BasicCallBack callback) {
        final String userId = getCurrentUserId();
        getUser(userId, callback);
    }

    public void getUser(String userId, final BasicCallBack callback) {
        DatabaseReference usersRef = dataBaseRef().child("users");
        usersRef.child(userId).addListenerForSingleValueEvent(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        // Get user value
                        User user = dataSnapshot.getValue(User.class);

                        if (user == null) {
                            // User is null, error out
                            callback.callBack(FAIL, "User " + userId + " is unexpectedly null");
                        } else {
                            callback.callBack(SUCCESS, user);
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "getUser:onCancelled", databaseError.toException());
                    }
                });
    }

    public void addPost(final Post post, final BasicCallBack callback) {
        currentUser((int status, Object data) -> {
                if (status == SUCCESS) {
                    User user = (User) data;
                    post.uid = user.id;
                    post.author = user.username;
                    writeNewPost(post);
                    callback.callBack(SUCCESS, null);
                } else if (status == FAIL) {
                    String errorDescription = (String) data;
                    callback.callBack(FAIL, errorDescription);
                }
        });
    }

    private void writeNewPost(final Post post) {
        final String key = dataBaseRef().child("posts").push().getKey();
        post.id = key;
        uploadPhotoBitmap(post.photoBitmap, key, (int status, Object data) -> {
                if (status == SUCCESS) {
                    String fileName = (String) data;
                    // Create new post at /user-posts/$userid/$postid and at
                    // /posts/$postid simultaneously

                    Map<String, Object> postValues = post.toMap();

                    Map<String, Object> childUpdates = new HashMap<>();
                    childUpdates.put("/posts/" + key, postValues);
                    childUpdates.put("/user-posts/" + post.uid + "/" + post.id, postValues);

                    dataBaseRef().updateChildren(childUpdates);
                } else if (status == FAIL) {
                }
        });
    }

    public void uploadPhotoBitmap(Bitmap bitmap, String fileName, BasicCallBack callbak) {

        // bitmap to stream
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 85, bos);
        byte[] bitmapdata = bos.toByteArray();
        ByteArrayInputStream bs = new ByteArrayInputStream(bitmapdata);

        uploadPhotoFromStream(bs, fileName, (int status, Object data) -> {
            if (status == SUCCESS) {
                String uploadedFileName = (String) data;
                callbak.callBack(SUCCESS, uploadedFileName);
            } else if (status == FAIL) {
                String errorDescription = (String) data;
                callbak.callBack(FAIL, errorDescription);
            }
        });
    }

    public void uploadPhotoFromStream(final InputStream stream, final String id, final BasicCallBack callback) {
        final String uuid = UUID.randomUUID().toString();
        final String path = String.format("%s.jpg", id);

        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference ref = storage.getReferenceFromUrl(FIREBASE_STORAGE).child(path);

        ref.putStream(stream)
                .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                        callback.callBack(SUCCESS, path);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        String errorDescription = "setPersonPhotoFromStream upload onFailure: " + exception.toString();
                        callback.callBack(FAIL, errorDescription);
                    }
                });
    }

    public void downloadPhoto(Context ctx, String id, final BasicCallBack collback) {
        final String path = String.format("%s.jpg", id);
        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReferenceFromUrl(FIREBASE_STORAGE).child(path);
        storageRef.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
            @Override
            public void onSuccess(Uri uri) {
            collback.callBack(SUCCESS, uri);
            }
        });
    }

    public void addCommentToPost(final Post post, final String commentText, final BasicCallBack callback) {

        currentUser((int status, Object data) -> {
                if (status == SUCCESS) {
                    User user = (User) data;
                    final String key = dataBaseRef().child("comments").child(post.id).push().getKey();
                    Comment comment = new Comment(commentText);
                    comment.id = key;
                    comment.uid = user.id;
                    comment.postid = post.id;
                    comment.author = user.username;
                    Map<String, Object> commentValues = comment.toMap();
                    Map<String, Object> childUpdates = new HashMap<>();
                    childUpdates.put("/comments/" + post.id + "/" + key, commentValues);
                    dataBaseRef().updateChildren(childUpdates);
                    callback.callBack(SUCCESS, null);
                } else if (status == FAIL) {
                    String errorDescription = (String) data;
                    callback.callBack(FAIL, errorDescription);
                }
        });
    }

    public void getPost(String mPostKey, final BasicCallBack callback) {

        // Initialize Database
        mPostReference = dataBaseRef().child("posts").child(mPostKey);

        // Add value event listener to the post
        // [START post_value_event_listener]
        ValueEventListener postListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // Get Post object and use the values to update the UI
                Post post = dataSnapshot.getValue(Post.class);
                callback.callBack(SUCCESS, post);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                callback.callBack(FAIL, databaseError);
            }
        };
        mPostReference.addValueEventListener(postListener);
        // [END post_value_event_listener]

        mPostListener = postListener;
    }

    public void getAllPosts(final BasicCallBack collback) {
        DatabaseReference postsRef = dataBaseRef().child("posts");
        postsRef.addListenerForSingleValueEvent( new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ArrayList<Post> posts = new ArrayList<>();
                if (dataSnapshot.hasChildren()) {
                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
                        posts.add(ds.getValue(Post.class));
                    }
                }
                collback.callBack(SUCCESS, posts);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                collback.callBack(SUCCESS, new ArrayList<>());
            }
        });
    }

    // Set Up My Favorite Post

    public void isItMyFavoritePost(Post post, final BasicCallBack callback) {
        final String userId = getCurrentUserId();

        // Check on it is my post
        if (post.uid.equals(userId)) {
            callback.callBack(FAIL, null);
        } else {
            DatabaseReference usersRef = dataBaseRef().child("favorites").child(post.id).child(userId);
            usersRef.addListenerForSingleValueEvent( new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    Favorite favorite = dataSnapshot.getValue(Favorite.class);
                    if (favorite == null) {
                        callback.callBack(SUCCESS,false);
                    } else {
                        // It does not matter the favorite level now
                        callback.callBack(SUCCESS,true);
                    }
                }
                @Override
                public void onCancelled(DatabaseError databaseError) {
                    Log.w(TAG, "getUser:onCancelled", databaseError.toException());
                    callback.callBack(FAIL, null);
                }
            });
        }
    }


    public void setUpMyFavoritePost(final Post post, final Boolean isFavorite) {
        String userId = getCurrentUserId();
        Favorite favorite = new Favorite();
        if (isFavorite) {
            Map<String, Object> favoriteValues = favorite.toMap();
            Map<String, Object> childUpdates = new HashMap<>();
            String favoritePath = "/favorites/" + post.id + "/" + userId;
            childUpdates.put(favoritePath, favoriteValues);
            dataBaseRef().updateChildren(childUpdates);
        } else {
            DatabaseReference favoriteRef = dataBaseRef().child("favorites").child(post.id).child(userId);
            favoriteRef.removeValue();
        }
    }

    // End Set Up My Favorite Post

    public void removePostObserver() {
        // Remove post value event listener
        if (mPostListener != null) {
            mPostReference.removeEventListener(mPostListener);
        }
    }


}
