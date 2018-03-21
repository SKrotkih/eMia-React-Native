package dk.coded.emia.View.activity;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.github.chrisbanes.photoview.PhotoView;

import butterknife.BindView;
import butterknife.ButterKnife;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.R;
import dk.coded.emia.utils.Alerts;
import dk.coded.emia.utils.PhotosManager;
import dk.coded.emia.utils.PhotosManagerDelegate;
import static dk.coded.emia.utils.Constants.CANCEL;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class NewPostActivity extends BaseActivity implements View.OnClickListener, PhotosManagerDelegate {

    private static final String TAG = "NewPostActivity";
    Activity activity = NewPostActivity.this;

    @BindView(R.id.field_title) EditText mTitleField;
    @BindView(R.id.field_body) EditText mBodyField;
    @BindView(R.id.fab_submit_post) FloatingActionButton mSubmitButton;
    @BindView(R.id.photo_post) PhotoView ivPhoto;
    @BindView(R.id.add_to_post_photo_button) Button addPhotoButton;
    @BindView(R.id.back_button) ImageButton mBackButton;
    @BindView(R.id.star_button) ImageButton mStarButton;
    @BindView(R.id.nav_bar_title_tv) TextView mTitleTextView;
    @BindView(R.id.rlNotification) RelativeLayout rlNotification;

    private Bitmap photoBitmap;
    private DatabaseInteractor databaseInteractor;
    private PhotosManager photosManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_post);

        ButterKnife.bind(this);

        databaseInteractor = DatabaseFactory.getDatabaseInteractor();
        photosManager = new PhotosManager();

        addPhotoButton.setOnClickListener(this);
        mBackButton.setOnClickListener(this);
        mSubmitButton.setOnClickListener(this);

        mStarButton.setVisibility(View.GONE);

        showKeyboard(mTitleField);

        mTitleTextView.setText(getResources().getString(R.string.new_post_title));

        //prepareNotificationsListener(activity);
        rlNotification.setVisibility(View.GONE);
    }

    @Override
    public void onClick(View button) {
        hideKeyboard();
        int buttonId = button.getId();
        if (buttonId == R.id.add_to_post_photo_button) {
            photosManager.showPhotoDialog(this, this);
        } else if (buttonId == R.id.back_button) {
            finish();
        } else if (buttonId == R.id.fab_submit_post) {
            submitPost();
        }
    }

    private void submitPost() {
        final String title = mTitleField.getText().toString();
        final String body = mBodyField.getText().toString();

        // Title is required
        if (TextUtils.isEmpty(title)) {
            mTitleField.setError(getResources().getString(R.string.field_required));
            return;
        }

        // Body is required
        if (TextUtils.isEmpty(body)) {
            mBodyField.setError(getResources().getString(R.string.field_required));
            return;
        }

        if (photoBitmap == null) {
            Alerts.alertOk(this, "", getResources().getString(R.string.add_photo), (state, data) -> {
                if (state == SUCCESS) {
                    showPhotoDialog();
                }
            });
            return;
        }

        // Disable button so there are no multi-posts
        setEditingEnabled(false);
        Toast.makeText(this, getResources().getString(R.string.waiting_post), Toast.LENGTH_SHORT).show();

        Post post = new Post(title, body, photoBitmap);

        showProgressDialog();
        databaseInteractor.addPost(post, (int status, Object data) -> {
            hideProgressDialog();;
            if (status == SUCCESS) {
                // Finish this Activity, back to the stream
                setEditingEnabled(true);
                finish();
                // [END_EXCLUDE]
            } else if (status == FAIL) {
                String errorDescription = (String) data;
                // User is null, error out
                Log.e(TAG, errorDescription);
                Toast.makeText(NewPostActivity.this,
                        "Error: could not fetch user.",
                        Toast.LENGTH_SHORT).show();
            }  else if (status == CANCEL) {
                // [START_EXCLUDE]
                setEditingEnabled(true);
                // [END_EXCLUDE]
            }
        });
    }

    private void setEditingEnabled(boolean enabled) {
        mTitleField.setEnabled(enabled);
        mBodyField.setEnabled(enabled);
        if (enabled) {
            mSubmitButton.setVisibility(View.VISIBLE);
        } else {
            mSubmitButton.setVisibility(View.GONE);
        }
    }

    // PhotosManagerDelegate protocol:

    private void showPhotoDialog() {
        photosManager.showPhotoDialog(this, this);
    }

    public void setPhoto(Bitmap bitmap) {
        ivPhoto.setImageBitmap(bitmap);
        photoBitmap = bitmap;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        photosManager.onActivityResult(requestCode, resultCode, data);
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        photosManager.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

}
