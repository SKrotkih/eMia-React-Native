package dk.coded.emia.View.activity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import butterknife.ButterKnife;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.R;

import butterknife.BindView;

import static dk.coded.emia.utils.Constants.SUCCESS;

public class SignInActivity extends BaseActivity implements View.OnClickListener {

    private static final String TAG = "SignInActivity";

    private DatabaseInteractor interactor;

    @BindView(R.id.field_password) EditText mPasswordField;
    @BindView(R.id.field_email) EditText mEmailField;
    @BindView(R.id.button_sign_in) Button mSignInButton;
    @BindView(R.id.button_sign_up) Button mSignUpButton;
    @BindView(R.id.nav_title) TextView titleTextView;
    @BindView(R.id.star_button) ImageButton starButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);
        ButterKnife.bind(this);

        interactor = DatabaseFactory.getDatabaseInteractor();

        starButton.setVisibility(View.GONE);

        titleTextView.setText(getResources().getString(R.string.sign_in_title));

        // Click listeners
        mSignInButton.setOnClickListener((view) -> signIn());
        mSignUpButton.setOnClickListener((view) -> signUp());

        showKeyboard(mEmailField);
    }

    @Override
    public void onClick(View v) {
    }

    @Override
    public void onStart() {
        super.onStart();

        // Check auth on Activity start
        if (interactor.isUserSignedIn()) {
            onAuthSuccess();
        }
    }

    private void signIn() {
        hideKeyboard();
        Log.d(TAG, "signIn");
        if (!validateForm()) {
            return;
        }
        String email = mEmailField.getText().toString();
        String password = mPasswordField.getText().toString();
        showProgressDialog();
        interactor.signIn(email, password, this, (status, user) -> {
            hideProgressDialog();
            if (status == SUCCESS) {
                onAuthSuccess();
            } else {
                Toast.makeText(SignInActivity.this, getResources().getString(R.string.signin_failed),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void signUp() {
        hideKeyboard();

        Log.d(TAG, "signUp");
        if (!validateForm()) {
            return;
        }
        String email = mEmailField.getText().toString();
        String password = mPasswordField.getText().toString();
        showProgressDialog();
        interactor.signUp(email, password, this, (status, user) -> {
            hideProgressDialog();
            if (status == SUCCESS) {
                onAuthSuccess();
            } else {
                Toast.makeText(SignInActivity.this, getResources().getString(R.string.signup_failed),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void onAuthSuccess() {
        String userId = interactor.getCurrentUserId();
        String userEmail = interactor.getCurrentUserEmail();

        String username = usernameFromEmail(userEmail);

        // Write new user
        writeNewUser(userId, username, userEmail);

        // Go to MainActivity
        startActivity(new Intent(SignInActivity.this, MainActivity.class));
        finish();
    }

    private String usernameFromEmail(String email) {
        if (email.contains("@")) {
            return email.split("@")[0];
        } else {
            return email;
        }
    }

    private boolean validateForm() {
        boolean result = true;
        if (TextUtils.isEmpty(mEmailField.getText().toString())) {
            mEmailField.setError(getResources().getString(R.string.field_required));
            result = false;
        } else {
            mEmailField.setError(null);
        }
        String password = mPasswordField.getText().toString();
        if (TextUtils.isEmpty(password)) {
            mPasswordField.setError(getResources().getString(R.string.field_required));
            result = false;
        } else if (password.length() < 7) {
            mPasswordField.setError(getResources().getString(R.string.password_too_short));
            result = false;
        } else {
            mPasswordField.setError(null);
        }

        return result;
    }

    // [START basic_write]
    private void writeNewUser(String userId, String name, String email) {
        User user = new User(userId, name, email);
        interactor.addUser(user);
    }
    // [END basic_write]
}
