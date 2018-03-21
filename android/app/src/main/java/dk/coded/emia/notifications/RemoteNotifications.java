package dk.coded.emia.notifications;

import android.app.Activity;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Handler;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.webkit.URLUtil;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;

import dk.coded.emia.R;
import dk.coded.emia.View.GlideApp;
import dk.coded.emia.View.activity.PostDetailActivity;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.PositionedCropTransformation;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static com.bumptech.glide.request.RequestOptions.bitmapTransform;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class RemoteNotifications {

    public static void sendNotification(final User recipient, final User sender, final String type, final Object body) {
        Runnable runnable = new Runnable() {
            @Override
            public void run () {

                String titleNotification = sender.username;
                String bodyNotification = "";
                String attachmentUrl = sender.getAvatarFullUrl();

                Log.d(Constants.TAG, "MESSAGE FROM " + sender + " TO " + recipient + " TYPE " + type);

                switch(type) {
                    case Constants.NOTIFICATION_TYPE_LIKE:
                        bodyNotification = Constants.NOTIFICATION_LIKE_BODY + " '" + (String) body + "'";
                        break;
                }

                String[] tokensIOS = recipient.getIOSTokens();
                String[] tokensAndroid = recipient.getAndroidTokens();

                //
                // SEND to all iOS devices
                //

                if (tokensIOS != null) {
                    for (int i = 0; i < tokensIOS.length; i++) {
                        OkHttpClient client = new OkHttpClient();
                        JSONObject json = new JSONObject();
                        JSONObject notificationJson = new JSONObject();
                        JSONObject dataJson = new JSONObject();
                        try {
                            notificationJson.put("title", titleNotification);
                            notificationJson.put("body", bodyNotification);
                            notificationJson.put("sound", "default");

                            dataJson.put("uid", sender.id);
                            dataJson.put("title", titleNotification);
                            dataJson.put("body", bodyNotification);
                            dataJson.put("messageType", type);
                            dataJson.put("attachment-url", attachmentUrl);
                            dataJson.put("userdata", "");  // TODO: Send Post id

                            json.put("notification", notificationJson);
                            json.put("data", dataJson);

                            json.put("to", tokensIOS[i]);
                            json.put("content_available", false);

                            MediaType JSON = MediaType.parse("application/json; charset=utf-8");
                            RequestBody body = RequestBody.create(JSON, json.toString());
                            Request request = new Request.Builder()
                                    .header("Authorization","key=" + Constants.FIREBASE_NOTIFICATION_SERVER_KEY)
                                    .url(Constants.FIREBASE_NOTIFICATION_SERVER)
                                    .post(body)
                                    .build();
                            Response response = client.newCall(request).execute();
                            //String finalResponse = response.body().string();
                            //Log.d(Constants.TAG, "sendNotification: " + finalResponse);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }

                // Prevent send message it to itself
                if (sender.getTokenAndroid().equals(recipient.getTokenAndroid())) {
                    return;
                }

                //
                // SEND to all Android devices
                //


                if (tokensAndroid != null) {
                    for (int i = 0; i < tokensAndroid.length; i++) {
                        OkHttpClient client = new OkHttpClient();
                        JSONObject json = new JSONObject();
                        JSONObject dataJson = new JSONObject();
                        try {
                            dataJson.put("uid", sender.id);
                            dataJson.put("title", titleNotification);
                            dataJson.put("body", bodyNotification);
                            dataJson.put("messageType", type);
                            dataJson.put("attachment-url", attachmentUrl);
                            dataJson.put("userdata", "");  // TODO: Send Post id

                            json.put("data", dataJson);

                            json.put("to", tokensAndroid[i]);
                            json.put("content_available", false);

                            Log.d(Constants.TAG, "sendNotification JSON: " + json);

                            MediaType JSON = MediaType.parse("application/json; charset=utf-8");
                            RequestBody body = RequestBody.create(JSON, json.toString());
                            Request request = new Request.Builder()
                                    .header("Authorization","key=" + Constants.FIREBASE_NOTIFICATION_SERVER_KEY)
                                    .url(Constants.FIREBASE_NOTIFICATION_SERVER)
                                    .post(body)
                                    .build();
                            Response response = client.newCall(request).execute();
                            String finalResponse = response.body().string();
                            Log.d(Constants.TAG, "sendNotification RES: " + finalResponse);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        };

        new Thread(runnable).start();
    }

    public static void showNotification(Intent intent, final Activity activity, Boolean withClick) {
        TextView tvNotificationTitle = (TextView) activity.findViewById(R.id.tvNotificationTitle);
        TextView tvNotificationBody = (TextView) activity.findViewById(R.id.tvNotificationBody);
        ImageView ivNotificationImage = (ImageView) activity.findViewById(R.id.ivNotificationImage);
        final RelativeLayout rlNotification = (RelativeLayout) activity.findViewById(R.id.rlNotification);
        rlNotification.setVisibility(View.VISIBLE);
        rlNotification.startAnimation(AnimationUtils.loadAnimation(activity, R.anim.slide_down));

        String title = intent.getStringExtra(Constants.EXTRA_NOTIFICATION_TITLE);
        String body = intent.getStringExtra(Constants.EXTRA_NOTIFICATION_BODY);
        String url = intent.getStringExtra(Constants.EXTRA_NOTIFICATION_URL);
        final String type = intent.getStringExtra(Constants.EXTRA_NOTIFICATION_MSG_TYPE);
        final String senderID = intent.getStringExtra(Constants.EXTRA_NOTIFICATION_SENDER_ID);
        final String postId = intent.getStringExtra(Constants.EXTRA_NOTIFICATION_USERINFO);

        tvNotificationTitle.setText(title);
        tvNotificationBody.setText(body);

        if (URLUtil.isValidUrl(url)) {
            Glide.with(activity).load(url).into(ivNotificationImage);
        } else {
            DatabaseFactory.getDatabaseInteractor().downloadPhoto(activity, senderID, (int status, Object data) -> {
                if (status == SUCCESS) {
                    Uri uri = (Uri) data;
                    GlideApp.with(activity.getApplicationContext())
                            .load(uri.toString())
                            .apply(bitmapTransform(new PositionedCropTransformation(1, 0)))
                            .into(ivNotificationImage);
                }
            });
        }

        if (withClick) {
            rlNotification.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    switch(type) {
                        case Constants.NOTIFICATION_TYPE_LIKE:
                            browsePost(activity, postId);
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        playSound(activity);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                rlNotification.startAnimation(AnimationUtils.loadAnimation(activity, R.anim.slide_up));
                rlNotification.getAnimation()
                        .setAnimationListener(new Animation.AnimationListener() {
                            @Override
                            public void onAnimationEnd(Animation arg0) {
                                rlNotification.setVisibility(View.GONE);
                            }
                            public void onAnimationRepeat(Animation arg0) {}
                            public void onAnimationStart(Animation arg0) {}
                        });
            }
        }, Constants.NOTIFICATION_HIDE_TIME);
    }

    private static void playSound(Activity activity) {
        Ringtone defaultRingtone = RingtoneManager.getRingtone(activity, Settings.System.DEFAULT_NOTIFICATION_URI);
        Uri currentRintoneUri = RingtoneManager.getActualDefaultRingtoneUri(activity.getApplicationContext(), RingtoneManager.TYPE_NOTIFICATION);
        Ringtone currentRingtone = RingtoneManager.getRingtone(activity, currentRintoneUri);
        currentRingtone.play();
    }

    private static void browsePost(Activity activity, String postId) {
        DatabaseFactory.getDatabaseInteractor().getPost(postId, (int status, Object data) -> {
            if (status == SUCCESS) {
                Intent intent = new Intent(activity, PostDetailActivity.class);
                Post post = (Post) data;
                intent.putExtra("post", post);
                activity.startActivity(intent);
            }
        });
    }
}
