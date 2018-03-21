package dk.coded.emia.View.activity;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.text.TextUtils;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Spinner;
import android.widget.SpinnerAdapter;
import android.widget.TextView;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

import butterknife.ButterKnife;
import dk.coded.emia.R;
import dk.coded.emia.View.GlideApp;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.utils.PhotosManager;
import dk.coded.emia.utils.PhotosManagerDelegate;
import dk.coded.emia.utils.PositionedCropTransformation;

import static com.bumptech.glide.request.RequestOptions.bitmapTransform;
import static dk.coded.emia.utils.Constants.CANCEL;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.SUCCESS;

import butterknife.BindView;

/**
 * Created by oldman on 12/8/17.
 */

public final class MyProfileActivity extends BaseActivity implements View.OnClickListener, PhotosManagerDelegate {

    @BindView(R.id.back_button) ImageButton mBackButton;
    @BindView(R.id.user_name_label) TextView userNameTitleTextView;
    @BindView(R.id.user_name_text) EditText userNameTextView;
    @BindView(R.id.user_email_label) TextView userEmailTitleTextView;
    @BindView(R.id.user_email_text) TextView userEmailTextView;
    @BindView(R.id.user_photo_label) TextView userPhotoTitleTextView;
    @BindView(R.id.user_photo) ImageView userPhotoImageView;
    @BindView(R.id.yerarbirth_spinner) Spinner userYearOfBirthSpinner;
    @BindView(R.id.gender_spinner) Spinner userGenderSpinner;
    @BindView(R.id.municipality_spinner) Spinner userMunicipalitySpinner;
    @BindView(R.id.fab_submit_post) FloatingActionButton mSubmitButton;
    @BindView(R.id.nav_bar_title_tv) TextView titleEditText;
    @BindView(R.id.star_button) ImageButton starButton;
    @BindView(R.id.rlNotification) RelativeLayout rlNotification;

    private PhotosManager photosManager;
    private DatabaseInteractor databaseInteractor;
    private User mUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_profile);
        ButterKnife.bind(this);

        titleEditText.setText(getResources().getString(R.string.my_profile_title));

        photosManager = new PhotosManager();

        databaseInteractor = DatabaseFactory.getDatabaseInteractor();

        userPhotoImageView.setOnClickListener((view) -> changeMyPhoto());
        mBackButton.setOnClickListener((view) -> finish());
        mSubmitButton.setOnClickListener((view) -> submitProfile());

        addItemsOnSpinnerYears();
        addItemsOnSpinnerMunicipality();

        //prepareNotificationsListener(this);
        rlNotification.setVisibility(View.GONE);
        starButton.setVisibility(View.GONE);
    }

    @Override
    public void onClick(View v) {
    }

    @Override
    public void onStart() {
        super.onStart();

        final Context thisContext = this;
        databaseInteractor.currentUser((int status, Object data) -> {
                if (status == SUCCESS) {
                    User user = (User) data;
                    mUser = user;
                    userNameTextView.setText(user.username);
                    userEmailTextView.setText(user.email);

                    if (user.yearbirth != null && user.yearbirth > 0) {
                        Integer index = 2006 - user.yearbirth;
                        userYearOfBirthSpinner.setSelection(index);
                    } else {
                        userYearOfBirthSpinner.setSelection(0);
                    }
                    if (user.gender != null) {
                        userGenderSpinner.setSelection(user.gender);
                    } else {
                        userGenderSpinner.setSelection(0);
                    }
                    if (user.address != null && !user.address.isEmpty()) {
                        String municipalityId = user.address;
                        Integer position = getMunicipalityIndexWith(municipalityId);
                        userMunicipalitySpinner.setSelection(position);
                    } else {
                        userMunicipalitySpinner.setSelection(0);
                    }
                    databaseInteractor.downloadPhoto(MyProfileActivity.this, user.id, (int status2, Object data2) -> {
                            if (status2 == SUCCESS) {
                                Uri uri = (Uri) data2;
                                GlideApp.with(thisContext.getApplicationContext())
                                        .load(uri.toString())
                                        .apply(bitmapTransform(new PositionedCropTransformation(1, 0)))
                                        .into(userPhotoImageView);
                            }
                    });
                } else if (status == FAIL) {
                    userNameTextView.setText("");
                    userEmailTextView.setText("");
                    userPhotoImageView.setImageBitmap(null);
                    userYearOfBirthSpinner.setSelection(0);
                    userGenderSpinner.setSelection(0);
                    userMunicipalitySpinner.setSelection(0);
                }
        });
    }

    private void changeMyPhoto() {
        photosManager.showPhotoDialog(this, this);
    }

    // PhotosManagerDelegate protocol:

    public void setPhoto(Bitmap bitmap) {
        String fileName = databaseInteractor.getCurrentUserId();
        databaseInteractor.uploadPhotoBitmap(bitmap, fileName, (int status, Object data) -> {
                if (status == SUCCESS) {
                    userPhotoImageView.setImageBitmap(bitmap);
                } else if (status == FAIL) {
                }
        });
    }

    private void submitProfile() {
        if (mUser == null) {
            return;
        }
        final String name = userNameTextView.getText().toString();
        // Name is required
        if (TextUtils.isEmpty(name)) {
            return;
        }
        final String yearbirth = userYearOfBirthSpinner.getSelectedItem().toString();
        final Integer gender = userGenderSpinner.getSelectedItemPosition();
        mUser.username = name;
        mUser.yearbirth =  Integer.parseInt(yearbirth);
        mUser.gender = gender;
        mUser.address = getSelectedMunicipality();
        databaseInteractor.updateUser(mUser, (int status, Object data) -> {
                if (status == SUCCESS) {
                    finish();
                } else if (status == FAIL) {
                } else if (status == CANCEL) {
                }
        });
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

    // Year of birth spinner data source

    private void addItemsOnSpinnerYears() {
        List<String> list = new ArrayList<String>();
        for (Integer year = 2006; year > 1900; year-- ) {
            list.add(String.valueOf(year));
        }
        ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, list);
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        userYearOfBirthSpinner.setAdapter(dataAdapter);
    }

    private void addItemsOnSpinnerMunicipality() {
        List<String> municips = Arrays.asList(getResources().getStringArray(R.array.municipalities_arrays));
        List<String> list = new ArrayList<String>();
        for (String item: municips) {
            if (item.length() > 1) {
                StringTokenizer tokens = new StringTokenizer(item, "|");
                String id = tokens.nextToken();
                String name = tokens.nextToken();
                list.add(name);
            } else {
                list.add("");
            }
        }
        ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, list);
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        userMunicipalitySpinner.setAdapter(dataAdapter);
    }

    private String getSelectedMunicipality() {
        List<String> municips = Arrays.asList(getResources().getStringArray(R.array.municipalities_arrays));
        Integer municipalityIndex = userMunicipalitySpinner.getSelectedItemPosition();
        if (municipalityIndex > 0) {
            String municipalityItem = municips.get(municipalityIndex).toString();
            StringTokenizer tokens = new StringTokenizer(municipalityItem, "|");
            String municipalityId = tokens.nextToken();
            return municipalityId;
        } else {
            return "";
        }
    }

    private Integer getMunicipalityIndexWith(String municipalityId) {
        List<String> municips = Arrays.asList(getResources().getStringArray(R.array.municipalities_arrays));
        Integer index = -1;
        for (Integer i = 1; i < municips.size(); i++) {
            String item = municips.get(i);
            StringTokenizer tokens = new StringTokenizer(item, "|");
            String id = tokens.nextToken();
            if (id.equals(municipalityId)) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            return 0;
        } else {
            return index;
        }
    }

}
