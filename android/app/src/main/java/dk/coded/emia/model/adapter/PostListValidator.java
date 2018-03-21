package dk.coded.emia.model.adapter;

import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import dk.coded.emia.R;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.utils.Constants;

import static dk.coded.emia.utils.Constants.SUCCESS;

/**
 * Created by oldman on 1/2/18.
 */

public class PostListValidator {

    private Activity mActivity;

    public PostListValidator(Activity activity) {
        mActivity = activity;
    }

    public Boolean isValid(Post post, User user) {
        if (user == null) {
            Toast.makeText(mActivity, "Author of the post id" + post.id + " is not presented!", Toast.LENGTH_SHORT).show();
            return false;
        }
        FilterStorage.Filter filter = FilterStorage.getInstance().getFilter(mActivity);

        Integer ageMin = filter.ageMin;
        Integer ageMax = filter.ageMax;
        Integer gender = filter.gender;
        Integer favoriteStatus = filter.status;
        String searchString = FilterStorage.getInstance().getSearchText(mActivity);




        Boolean isValidGender = false;
        if (gender == Constants.GENDER_BOTH) {
            isValidGender = true;
        } else if (user.gender == gender) {

            Log.d("Validator:", "I'm " + String.valueOf(user.gender) + "; Looking for " + String.valueOf(gender));

            isValidGender = true;
        }

        Boolean isSearchOk = true;
        if (searchString != null && !searchString.isEmpty()) {

            Log.d("Validator:", "Search " + searchString);

            String title = post.title;
            String body = post.body;
            isSearchOk = title.toLowerCase().contains(searchString.toLowerCase()) || body.toLowerCase().contains(searchString.toLowerCase());
        }

        return isValidGender && isSearchOk;
    }

}
