package dk.coded.emia.notifications;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import dk.coded.emia.R;
import dk.coded.emia.View.activity.MainActivity;
import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.Utils;

public class NotificationFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(Constants.TAG, "onCreate: ");
    }

    @Override
    public void onMessageReceived(final RemoteMessage remoteMessage) {
        if (remoteMessage == null) {
            return;
        }
        if (remoteMessage.getData() != null) {
            final Context ctx = this;
            Handler h = new Handler(Looper.getMainLooper());
            h.post(new Runnable() {
                public void run() {
                    if (!Utils.isAppIsInBackground(ctx)) {
                        Intent intent = new Intent(Constants.NOTIFICATION_LOCAL_BROADCAST);
                        intent.putExtra(Constants.EXTRA_NOTIFICATION_TITLE, remoteMessage.getData().get("title"));
                        intent.putExtra(Constants.EXTRA_NOTIFICATION_BODY, remoteMessage.getData().get("body"));
                        intent.putExtra(Constants.EXTRA_NOTIFICATION_SENDER_ID, remoteMessage.getData().get("uid"));
                        intent.putExtra(Constants.EXTRA_NOTIFICATION_MSG_TYPE, remoteMessage.getData().get("messageType"));
                        intent.putExtra(Constants.EXTRA_NOTIFICATION_URL, remoteMessage.getData().get("attachment-url"));
                        intent.putExtra(Constants.EXTRA_NOTIFICATION_LIKE, remoteMessage.getData().get("like"));
                        intent.putExtra(Constants.EXTRA_NOTIFICATION_USERINFO, remoteMessage.getData().get("userinfo"));
                        LocalBroadcastManager.getInstance(ctx).sendBroadcast(intent);
                    } else {
                        createNotification(remoteMessage, true);
                    }
                }
            });
        }
    }

    private void createNotification(RemoteMessage remoteMessage, boolean isSound) {

        String recipientID = String.valueOf(remoteMessage.getData().get("uid"));
        String title = remoteMessage.getData().get("title");
        String body = remoteMessage.getData().get("body");
        String type = remoteMessage.getData().get("messageType");

        Intent intent;

        switch(type) {
            case Constants.NOTIFICATION_TYPE_LIKE:
                intent = new Intent(this, MainActivity.class);
                break;
            default:
                intent = new Intent(this, MainActivity.class);
                break;
        }

        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.putExtra(Constants.PEOPLE_ID, recipientID);

        PendingIntent resultIntent = PendingIntent.getActivity(this , 0, intent, PendingIntent.FLAG_ONE_SHOT);

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder( this)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setDefaults(NotificationCompat.DEFAULT_LIGHTS | NotificationCompat.DEFAULT_SOUND)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setContentIntent(resultIntent);

        if (isSound) {
            notificationBuilder.setDefaults(NotificationCompat.DEFAULT_SOUND);
            Uri notificationSoundURI = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            notificationBuilder.setSound(notificationSoundURI);
        } else {
            notificationBuilder.setDefaults(0);
        }

        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            notificationBuilder.setColor(getResources().getColor(R.color.colorAccent));
        }

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0, notificationBuilder.build());
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(Constants.TAG, "onDestroy: ");
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
        Log.d(Constants.TAG, "onTaskRemoved: ");
    }
}
