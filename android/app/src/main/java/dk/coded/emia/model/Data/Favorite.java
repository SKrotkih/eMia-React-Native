package dk.coded.emia.model.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import dk.coded.emia.utils.Constants;

// [START comment_class]
@IgnoreExtraProperties
public class Favorite implements Serializable {

    public int level;

    public Favorite() {
        this.level = 0;
    }

    // [START post_to_map]
    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put(Constants.Fields.Favorite.level, level);
        return result;
    }
    // [END post_to_map]
}
// [END comment_class]
