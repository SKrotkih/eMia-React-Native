package dk.coded.emia.model.interactor;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;

import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;

import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.utils.BasicCallBack;

/**
 * Created by oldman on 11/30/17.
 */

public interface DatabaseInteractor {

    DatabaseReference dataBaseRef();

    Boolean isUserSignedIn();
    void signIn(String email, String password, Activity acrtivity, final BasicCallBack collback);
    void signUp(String email, String password, Activity acrtivity, final BasicCallBack collback);
    void logOut();
    void addUser(User user);
    void updateUser(final User user, final BasicCallBack callback);
    void addPost(final Post post, final BasicCallBack callback);
    void addCommentToPost(final Post post, final String commentText, final BasicCallBack callback);
    void getPost(String mPostKey, final BasicCallBack callback);
    void downloadPhoto(Context ctx, String id, final BasicCallBack collback);
    void removePostObserver();
    void currentUser(final BasicCallBack callback);
    void isItMyFavoritePost(Post post, final BasicCallBack callback);
    void setUpMyFavoritePost(final Post post, final Boolean isFavorite);
    void getAllPosts(final BasicCallBack collback);
    void getAllUsers(final BasicCallBack collback);
    void getUser(String userId, final BasicCallBack callback);
    String getCurrentUserEmail();
    String getCurrentUserId();
    void uploadPhotoBitmap(Bitmap bitmap, String fileName, BasicCallBack callbak);
}
