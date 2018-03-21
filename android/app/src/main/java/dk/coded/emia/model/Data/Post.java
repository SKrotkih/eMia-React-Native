package dk.coded.emia.model.Data;

import android.graphics.Bitmap;

import java.io.Serializable;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import dk.coded.emia.utils.Constants;

// [START post_class]
@IgnoreExtraProperties
public class Post implements Serializable {

    public String id;
    public String uid;
    public String author;
    public String title;
    public String body;
    public Bitmap photoBitmap;
    public long created;
    public String photosize;
    public int starCount = 0;
    public Map<String, Boolean> stars = new HashMap<>();

    public Post() {
        // Default constructor required for calls to DataSnapshot.getValue(Post.class)
    }

    public Post(String title, String body, Bitmap bitmap) {
        this.title = title;
        this.body = body;
        this.photoBitmap = bitmap;
        this.photosize = String.format("%d;%d", bitmap.getWidth(), bitmap.getHeight());
        this.created = System.currentTimeMillis()/1000;
    }

    public Calendar getDate() {
        Calendar date = Calendar.getInstance();
        date.setTimeInMillis(created * 1000);
        return date;
    }

    // [START post_to_map]
    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put(Constants.Fields.Post.id, id);
        result.put(Constants.Fields.Post.uid, uid);
        result.put(Constants.Fields.Post.author, author);
        result.put(Constants.Fields.Post.title, title);
        result.put(Constants.Fields.Post.body, body);
        result.put(Constants.Fields.Post.starCount, starCount);
        result.put(Constants.Fields.Post.stars, stars);
        result.put(Constants.Fields.Post.photosize, photosize);
        result.put(Constants.Fields.Post.created, created);
        return result;
    }
    // [END post_to_map]

    public Double photoWidth() {
        String[] separated = photosize.split(";");
        if (separated.length == 2) {
            return Double.parseDouble(separated[0]);
        } else {
            return 0.0;
        }
    };

    public Double photoHeight() {
        String[] separated = photosize.split(";");
        if (separated.length == 2) {
            return Double.parseDouble(separated[1]);
        } else {
            return 0.0;
        }
    };

}
// [END post_class]
