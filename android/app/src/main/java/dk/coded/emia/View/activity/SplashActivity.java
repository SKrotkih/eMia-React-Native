package dk.coded.emia.View.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import dk.coded.emia.View.activity.MainActivity;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.Utils;

import static dk.coded.emia.utils.Constants.CANCEL;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        DatabaseInteractor databaseInteractor = DatabaseFactory.getDatabaseInteractor();
        Intent intent;
        if (databaseInteractor.isUserSignedIn()) {
            intent = new Intent(this, MainActivity.class);
        } else {
            intent = new Intent(this, SignInActivity.class);
        }
        startActivity(intent);
        finish();
    }
}
