package dk.coded.emia.utils;

import android.app.Activity;
import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;

import static dk.coded.emia.utils.Constants.SUCCESS;

/**
 * Created by oldman on 1/28/18.
 */

public final class Alerts {

    public static void alertOk(Activity activity, String title, String message, final BasicCallBack callback) {
        AlertDialog.Builder builder = new AlertDialog.Builder(activity);
        builder.setTitle(title);
        builder.setMessage(message);
        AlertDialog alert = builder.create();
        alert.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        callback.callBack(SUCCESS, null);
                    }
                });
        alert.show();
    }

}
