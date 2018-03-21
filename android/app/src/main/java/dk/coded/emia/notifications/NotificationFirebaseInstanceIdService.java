package dk.coded.emia.notifications;

import android.content.Context;
import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.Utils;

import static android.content.ContentValues.TAG;
import static dk.coded.emia.utils.Constants.CANCEL;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class NotificationFirebaseInstanceIdService extends FirebaseInstanceIdService {
    private DatabaseInteractor databaseInteractor;

    Context context;

    /**
     * Called if InstanceID token is updated. This may occur if the security of
     * the previous token had been compromised. Note that this is called when the InstanceID token
     * is initially generated so this is where you would retrieve the token.
     */
    // [START refresh_token]
    @Override
    public void onTokenRefresh() {
        final String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        context = this;
        databaseInteractor = DatabaseFactory.getDatabaseInteractor();
        databaseInteractor.currentUser((int status, Object data) -> {
                    if (status == SUCCESS) {
                        User user = (User) data;
                        user.tokenAndroid = refreshedToken;
                        databaseInteractor.updateUser(user, (int result, Object object) -> {
                            if (result == SUCCESS) {
                                Utils.setStringPreference(context, Constants.EXTRA_TOKEN, refreshedToken);
                            } else if (result == FAIL) {
                            } else if (result == CANCEL) {
                            }
                        });
                    }
                });

        Log.d(Constants.TAG, "Refreshed token: " + refreshedToken);

        sendRegistrationToServer(refreshedToken);
    }
    // [END refresh_token]

    /**
     * Persist token to third-party servers.
     *
     * Modify this method to associate the user's FCM InstanceID token with any server-side account
     * maintained by your application.
     *
     * @param token The new token.
     */
    private void sendRegistrationToServer(String token) {
        // TODO: Implement this method to send token to your app server.
    }
}
