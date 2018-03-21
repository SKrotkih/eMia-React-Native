package dk.coded.emia.model.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import dk.coded.emia.utils.Constants;

// [START comment_class]
@IgnoreExtraProperties
public class Comment implements Serializable {

    public String id;
    public String uid;
    public String postid;
    public String author;
    public String text;
    public long created;

    public Comment() {
        // Default constructor required for calls to DataSnapshot.getValue(Comment.class)
    }

    public Comment(String text) {
        this.text = text;
        this.created = System.currentTimeMillis()/1000;
    }

    // [START post_to_map]
    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put(Constants.Fields.Comment.id, id);
        result.put(Constants.Fields.Comment.uid, uid);
        result.put(Constants.Fields.Comment.postid, postid);
        result.put(Constants.Fields.Comment.author, author);
        result.put(Constants.Fields.Comment.text, text);
        result.put(Constants.Fields.Comment.created, created);
        return result;
    }
    // [END post_to_map]


}
// [END comment_class]
