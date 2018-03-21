package dk.coded.emia.View.pages;

import android.app.Activity;

import dk.coded.emia.View.fragment.PostListFragment;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.adapter.PostListValidator;
import dk.coded.emia.utils.BasicCallBack;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;

import static dk.coded.emia.utils.Constants.SUCCESS;

public class MyPostsFragment extends PostListFragment {

    private DatabaseInteractor mInteractor;

    public MyPostsFragment() {
        mInteractor = DatabaseFactory.getDatabaseInteractor();
    }

    @Override
    public void needShow(Post post, User user, BasicCallBack callback) {
        if (!mValidator.isValid(post, user)) {
            callback.callBack(SUCCESS, false);
        } else {
            String currentUserId = mInteractor.getCurrentUserId();
            Boolean isItMyPost = post.uid.equals(currentUserId);
            callback.callBack(SUCCESS, isItMyPost);
        }
    }
}
