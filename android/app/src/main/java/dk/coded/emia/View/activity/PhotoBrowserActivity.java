package dk.coded.emia.View.activity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.github.chrisbanes.photoview.PhotoView;

import butterknife.BindView;
import butterknife.ButterKnife;
import dk.coded.emia.R;
import dk.coded.emia.View.GlideApp;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.utils.PositionedCropTransformation;

import static android.widget.ImageView.ScaleType.MATRIX;
import static com.bumptech.glide.request.RequestOptions.bitmapTransform;
import static dk.coded.emia.utils.Constants.TRANSPARENT_COLOR;

/**
 * Created by oldman on 12/8/17.
 */

public class PhotoBrowserActivity extends BaseActivity {

    @BindView(R.id.back_button) ImageButton mBackButton;
    @BindView(R.id.photoImageView) PhotoView mPhotoImageView;
    @BindView(R.id.star_button) ImageButton starButton;
    @BindView(R.id.nav_header) RelativeLayout navBar;
    @BindView(R.id.nav_bar_title_tv) TextView mTitleTextView;
    @BindView(R.id.rlNotification) RelativeLayout rlNotification;

    private Post mPost;
    private Context mContext;
    private DatabaseInteractor databaseInteractor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo_browser);

        ButterKnife.bind(this);

        databaseInteractor = DatabaseFactory.getDatabaseInteractor();

        mBackButton.setOnClickListener((view) -> this.finish());

        navBar.setBackgroundColor(Color.parseColor(TRANSPARENT_COLOR));
        Intent intent = getIntent();
        mPost = (Post) intent.getSerializableExtra("post");

        //prepareNotificationsListener(this);
        rlNotification.setVisibility(View.GONE);
        starButton.setVisibility(View.GONE);
    }

    @Override
    public void onStart() {
        super.onStart();

        mContext = this;

        mTitleTextView.setText(mPost.title);
        //mPhotoImageView.setScaleType(MATRIX);

        databaseInteractor.downloadPhoto(this, mPost.id, (int status, Object data) -> {
            Uri uri = (Uri) data;
            GlideApp.with(mContext.getApplicationContext())
                    .load(uri.toString())
                    .apply(bitmapTransform(new PositionedCropTransformation(1, 0)))
                    .into(mPhotoImageView);
        });
    }
}
