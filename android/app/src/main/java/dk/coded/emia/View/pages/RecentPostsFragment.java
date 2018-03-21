package dk.coded.emia.View.pages;

import android.app.Activity;

import dk.coded.emia.View.fragment.PostListFragment;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.adapter.PostListValidator;
import dk.coded.emia.utils.BasicCallBack;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class RecentPostsFragment extends PostListFragment {

    @Override
    public void needShow(Post post, User user, BasicCallBack callback) {
        Boolean isThisPostOk = mValidator.isValid(post, user);
        callback.callBack(SUCCESS, isThisPostOk);
    }
}
