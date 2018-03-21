package dk.coded.emia.notifications;

import android.content.Intent;

public interface LocalNotificationListener {
    public void onLocalNotificationUpdate(Intent intent);
}
