package dk.coded.emia.model.Data;

import android.content.Context;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.Utils;

// [START blog_user_class]
@IgnoreExtraProperties
public class User {

    public String id;
    public String username;
    public String email;
    public String address;
    public Integer gender;
    public Integer yearbirth;
    public String tokenAndroid;
    public String tokenIOS;

    public User() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public User(String id, String name, String email) {
        this.id = id;
        this.username = name;
        this.email = email;
        this.address = null;
        this.yearbirth = null;
        this.gender = null;
        this.tokenAndroid = null;
        this.tokenIOS = null;
    }

    // [START post_to_map]
    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put(Constants.Fields.User.id, id);
        result.put(Constants.Fields.User.username, username);
        result.put(Constants.Fields.User.email, email);
        result.put(Constants.Fields.User.yearbirth, yearbirth == null ? 0 : yearbirth);
        result.put(Constants.Fields.User.gender, gender == null ? -1 : gender);
        result.put(Constants.Fields.User.address, address == null ? "" : address);
        result.put(Constants.Fields.User.tokenAndroid, tokenAndroid == null ? "" : tokenAndroid);
        result.put(Constants.Fields.User.tokenIOS, tokenIOS == null ? "" : tokenIOS);

        return result;
    }
    // [END post_to_map]


    @Exclude
    public String[] getIOSTokens() {
        String[] tokens = null;

        if (tokenIOS != null) {
            tokens = tokenIOS.split(",");
        }
        return tokens;
    }

    @Exclude
    public String[] getAndroidTokens() {
        String[] tokens = null;

        if (tokenAndroid != null && !tokenAndroid.isEmpty()) {
            tokens = tokenAndroid.split(",");
        }
        return tokens;
    }

    public String getTokenAndroid() {
        return tokenAndroid;
    }

    public void setTokenAndroid(String tokenAndroid) {
        this.tokenAndroid = tokenAndroid;
    }

    public String getTokenIOS() {
        return tokenIOS;
    }

    public void setTokenIOS(String tokenIOS) {
        this.tokenIOS = tokenIOS;
    }

    @Exclude
    public String getAvatarFullUrl() {
        return Utils.getPhotoUrlFromStorage(id);
    }
}
// [END blog_user_class]
