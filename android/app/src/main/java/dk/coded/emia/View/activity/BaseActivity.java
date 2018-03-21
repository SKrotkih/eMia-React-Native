package dk.coded.emia.View.activity;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import dk.coded.emia.notifications.LocalNotificationListener;
import dk.coded.emia.notifications.LocalNotificationReceiver;
import dk.coded.emia.notifications.RemoteNotifications;
import dk.coded.emia.utils.Constants;

public class BaseActivity extends AppCompatActivity {

    private Activity mActivity;
    private Boolean mNotificationListening = false;
    private ProgressDialog mProgressDialog;
    private View mFocusView;
    private LocalNotificationReceiver notificationReceiver;

    public void showProgressDialog() {
        if (mProgressDialog == null) {
            mProgressDialog = new ProgressDialog(this);
            mProgressDialog.setCancelable(false);
            mProgressDialog.setMessage("Loading...");
        }
        mProgressDialog.show();
    }

    public void hideProgressDialog() {
        if (mProgressDialog != null && mProgressDialog.isShowing()) {
            mProgressDialog.dismiss();
        }
    }

    // Push Notifications
    void prepareNotificationsListener(Activity activity) {
        mNotificationListening = true;
        mActivity = activity;
        notificationReceiver = new LocalNotificationReceiver();
        notificationReceiver.addUpdateListener((LocalNotificationListener) mActivity);
    }

    @Override
    public void onResume(){
        super.onResume();

        if (mNotificationListening) {
            IntentFilter filter = new IntentFilter(Constants.NOTIFICATION_LOCAL_BROADCAST);
            LocalBroadcastManager.getInstance(mActivity).registerReceiver(notificationReceiver, filter);
        }
    }

    @Override
    public void onPause(){
        if (mNotificationListening) {
            LocalBroadcastManager.getInstance(mActivity).unregisterReceiver(notificationReceiver);
        }
        super.onPause();
    }

    @Override
    public void onStop(){
        hideKeyboard();
        super.onStop();
    }

    // LocalNotificationListener Interface implementation
    public void onLocalNotificationUpdate(Intent intent) {
        RemoteNotifications.showNotification(intent, mActivity, true);
    }

    // Keyboard

    public void showKeyboard(View focusView) {
        mFocusView = focusView;
        mFocusView.requestFocus();
        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, InputMethodManager.HIDE_IMPLICIT_ONLY);
    }

    public void hideKeyboard() {
        if (mFocusView == null) {
            return;
        }
        InputMethodManager imm = (InputMethodManager) getSystemService(this.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(mFocusView.getWindowToken(), 0);
        mFocusView = null;
    }

}
