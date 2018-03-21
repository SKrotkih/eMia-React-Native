package dk.coded.emia.View.pages;

import android.app.Activity;
import android.util.Log;
import dk.coded.emia.View.fragment.PostListFragment;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.adapter.PostListValidator;
import dk.coded.emia.utils.BasicCallBack;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class MyFavoritePostsFragment extends PostListFragment {

    private DatabaseInteractor mInteractor;

    public MyFavoritePostsFragment() {
        mInteractor = DatabaseFactory.getDatabaseInteractor();
    }

    @Override
    public void needShow(Post post, User user, BasicCallBack callback) {

        Log.d(getClass().getName(), "handle: " + post.id);

        if (!mValidator.isValid(post, user)) {
            callback.callBack(SUCCESS, false);
        } else {
            mInteractor.isItMyFavoritePost(post, (int status, Object data) -> {
                if (status == SUCCESS) {
                    Boolean isFavorite = (Boolean) data;
                    Log.d(getClass().getName(), "Post " + post.id + " is my favorite - " + isFavorite.toString());
                    callback.callBack(SUCCESS, isFavorite);
                } else if (status == FAIL) {
                    callback.callBack(SUCCESS, false);
                }
            });
        }
    }
}
