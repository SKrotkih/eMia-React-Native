package dk.coded.emia.notifications;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class LocalNotificationReceiver extends BroadcastReceiver {
    LocalNotificationListener listener;

    public LocalNotificationReceiver() {}

    public void addUpdateListener(LocalNotificationListener listener) {
        this.listener = listener;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        listener.onLocalNotificationUpdate(intent);
    }
}
