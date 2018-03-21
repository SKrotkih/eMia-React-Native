package dk.coded.emia.utils;


/**
 * Created by manuja on 14/5/17.
 */

public class Constants {

    public final static String TAG = "BOBLBERGDBG";

    public final static String DATABASE_NAME = "main";

    public static String FIREBASE_NOTIFICATION_SERVER = "https://fcm.googleapis.com/fcm/send";
    public static String FIREBASE_NOTIFICATION_SERVER_KEY = "AAAAdWppnwU:APA91bGrOKOmQcWVrhqCVrRphwzoegc4Rk9qD3urkG4jYiFGazB18dzjbb01uARQPSHPGMXyALtf8pW2mPudQN9e_L4wY-bISpaiH2QaLfEdILcRJjMfvZHq5LDdDfESngBEShCHhp9Q";
    public final static String FIREBASE_STORAGE = "gs://boblberg-b8a0f.appspot.com";

    public final static String TRANSPARENT_COLOR = "#00000000";

    public static final String PREFERENCES = "PREFERENCES" ;

    public static String EXTRA_FILTER_GENDER = "EXTRA_FILTER_GENDER";
    public static String EXTRA_FILTER_STATUS = "EXTRA_FILTER_STATUS";
    public static String EXTRA_FILTER_AGE_MIN = "EXTRA_FILTER_AGE_MIN";
    public static String EXTRA_FILTER_AGE_MAX = "EXTRA_FILTER_AGE_MAX";
    public static String EXTRA_SEARCH_TEXT = "EXTRA_SEARCH_TEXT";

    // Notifications

    public static String EXTRA_NOTIFICATION_TITLE = "EXTRA_NOTIFICATION_TITLE";
    public static String EXTRA_NOTIFICATION_BODY = "EXTRA_NOTIFICATION_BODY";
    public static String EXTRA_NOTIFICATION_URL = "EXTRA_NOTIFICATION_URL";
    public static String EXTRA_NOTIFICATION_MSG_TYPE = "EXTRA_NOTIFICATION_MSG_TYPE";
    public static String EXTRA_NOTIFICATION_LIKE = "EXTRA_NOTIFICATION_LIKE";
    public static String EXTRA_NOTIFICATION_SENDER_ID = "EXTRA_NOTIFICATION_SENDER_ID";
    public static String EXTRA_NOTIFICATION_USERINFO = "EXTRA_NOTIFICATION_USERINFO";

    public static final String NOTIFICATION_TYPE_LIKE = "Emia.Post.like";

    public static String NOTIFICATION_LIKE_BODY = "Likes your post";
    public static String NOTIFICATION_LOCAL_BROADCAST = "NOTIFICATION_LOCAL_BROADCAST";
    public static int NOTIFICATION_HIDE_TIME = 6000;  // 6 seconds

    public static String EXTRA_TOKEN = "EXTRA_TOKEN";
    public static String PEOPLE_ID = "PEOPLE_ID";

    // -

    public static int FILTER_MIN_AGE = 17;
    public static int FILTER_MAX_AGE = 40;
    public static int FILTER_MIN_AGE_LIMIT = 0;
    public static int FILTER_MAX_AGE_LIMIT = 100;

    // Gender (User property for filter)
    public final static int GENDER_BOTH = 0;
    public final static int GENDER_GUY = 1;
    public final static int GENDER_GIRL = 2;

    // State of my favorite
    public final static int STATUS_ALL = 0;
    public final static int STATUS_MY_FAVORITE = 1;

    public static int SUCCESS = 0;
    public static int FAIL = 1;
    public static int CANCEL = 2;

    // Table field names

    public class Fields {
        public  class User {
            public final static String id = "id";
            public final static String username = "username";
            public final static String email = "email";
            public final static String yearbirth = "yearbirth";
            public final static String gender = "gender";
            public final static String address = "address";
            public final static String tokenAndroid = "tokenAndroid";
            public final static String tokenIOS = "tokenIOS";
        }

        public class Post {
            public final static String id = "id";
            public final static String uid = "uid";
            public final static String author = "author";
            public final static String title = "title";
            public final static String body = "body";
            public final static String starCount = "starCount";
            public final static String stars = "stars";
            public final static String photosize = "photosize";
            public final static String created = "created";
        }

        public class Favorite {
            public final static String level = "level";
        }

        public class Comment {
            public final static String id = "id";
            public final static String uid = "uid";
            public final static String postid = "postid";
            public final static String author = "author";
            public final static String text = "text";
            public final static String created = "created";
        }

    }

}
