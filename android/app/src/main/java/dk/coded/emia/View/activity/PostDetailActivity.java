package dk.coded.emia.View.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.format.DateUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.github.chrisbanes.photoview.PhotoView;
import com.google.firebase.database.DatabaseError;

import butterknife.ButterKnife;
import dk.coded.emia.View.GlideApp;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.notifications.RemoteNotifications;
import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.PositionedCropTransformation;
import dk.coded.emia.model.observer.CommentObserver;
import dk.coded.emia.model.observer.CommentObserverCallback;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.utils.BasicCallBack;
import dk.coded.emia.model.Data.Comment;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.R;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import butterknife.BindView;
import dk.coded.emia.utils.Utils;

import static com.bumptech.glide.request.RequestOptions.bitmapTransform;
import static dk.coded.emia.utils.Constants.CANCEL;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class PostDetailActivity extends BaseActivity {

    private static final String TAG = "PostDetailActivity";
    private CommentAdapter mAdapter;
    Activity activity = PostDetailActivity.this;

    @BindView(R.id.post_author) TextView mAuthorView;
    @BindView(R.id.post_body) TextView mBodyView;
    @BindView(R.id.photoImageView) PhotoView mPhotoImageView;
    @BindView(R.id.field_comment_text) EditText mCommentField;
    @BindView(R.id.post_comment_button) Button mCommentButton;
    @BindView(R.id.recycler_comments) RecyclerView mCommentsRecycler;
    @BindView(R.id.back_button) ImageButton mBackButton;
    @BindView(R.id.star_button) ImageButton mStarButton;
    @BindView(R.id.post_author_photo) ImageView mPhotoAvatarImageView;
    @BindView(R.id.sendEmailButton) Button mSendEmailButton;
    @BindView(R.id.post_date_tv) TextView mCreatedTextView;
    @BindView(R.id.nav_bar_title_tv) TextView mTitleTextView;
    @BindView(R.id.rlNotification) RelativeLayout rlNotification;

    private Post mPost;
    private Context mContext;

    private DatabaseInteractor databaseInteractor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_detail);
        ButterKnife.bind(this);

        Intent intent = getIntent();
        mPost = (Post) intent.getSerializableExtra("post");

        databaseInteractor = DatabaseFactory.getDatabaseInteractor();
        mCommentsRecycler.setLayoutManager(new LinearLayoutManager(this));

        setUpButtonListeners();

        //prepareNotificationsListener(activity);
        rlNotification.setVisibility(View.GONE);
    }

    private void setUpButtonListeners() {
        mCommentButton.setOnClickListener(view -> sendComment());
        mBackButton.setOnClickListener(view -> finish());
        mStarButton.setOnClickListener(view -> onStarButtonPressed());
        mPhotoImageView.setOnClickListener(view -> photoPreview());
        mSendEmailButton.setOnClickListener(view -> sendEmail());
    }

    @Override
    public void onResume(){
        super.onResume();
    }

    @Override
    public void onPause(){
        super.onPause();
    }

    @Override
    public void onStart() {
        super.onStart();

        if (mPost == null) {
            return;
        }

        showData(mPost);
    }

    @Override
    public void onStop() {
        super.onStop();

        // Remove post value event listener
        databaseInteractor.removePostObserver();

        // Clean up comments listener
        mAdapter.cleanupListener();
    }

    private void showData(Post post) {
        mTitleTextView.setText(post.title);
        mBodyView.setText(post.body);

        setUpStar();

        long created = post.created * 1000;
        String relativeTime = DateUtils.getRelativeTimeSpanString(created).toString();
        mCreatedTextView.setText(String.format("Published %s", relativeTime));

        databaseInteractor.getUser(post.uid, (int status, Object data) -> {
            if (status == SUCCESS) {
                User user = (User) data;
                mAuthorView.setText(user.username);
            }
        });

        mContext = this;

        databaseInteractor.downloadPhoto(this, post.id,  (int status, Object data) -> {
            if (status == SUCCESS) {
                Uri uri = (Uri) data;
                GlideApp.with(mContext.getApplicationContext())
                        .load(uri.toString())
                        .apply(bitmapTransform(new PositionedCropTransformation(1, 0)))
                        .into(mPhotoImageView);
            }
        });

        databaseInteractor.downloadPhoto(this, post.uid, (int status, Object data) -> {
            if (status == SUCCESS) {
                Uri uri = (Uri) data;
                GlideApp.with(mContext.getApplicationContext())
                        .load(uri.toString())
                        .apply(bitmapTransform(new PositionedCropTransformation(1, 0)))
                        .into(mPhotoAvatarImageView);
            }
        });

        // Listen for comments
        mAdapter = new CommentAdapter(this, post.id, (int status, Object data) -> {
            // Auto Scroll to a new comment
            mCommentsRecycler.smoothScrollToPosition(0);

        });
        mCommentsRecycler.setAdapter(mAdapter);
    }

    private void setUpStar() {
        isItMyFavoritePost(mPost, new BasicCallBack() {
            @Override
            public void callBack(int status, Object data) {
                if (status == SUCCESS) {
                    Boolean isFavorite = (Boolean) data;
                    int resId = R.drawable.ic_star_border_black_24dp;
                    if (isFavorite) {
                        resId = R.drawable.ic_star_black_24dp;
                    }
                    mStarButton.setImageResource(resId);
                    mStarButton.setVisibility(View.VISIBLE);
                } else if (status == FAIL) {
                    mStarButton.setVisibility(View.GONE);
                }
            }
        });
    }


    // Press Like button handler
    private void onStarButtonPressed() {
        setUpPostAsMyFavorite((int status, Object data) -> {
            if (status == SUCCESS) {
                if ((Boolean)data) {
                    sendLikeTypePushNotification();
                }
                setUpStar();
            } else if (status == FAIL) {

            }
        });
    }

    private void setUpPostAsMyFavorite(final BasicCallBack callback) {
        isItMyFavoritePost(mPost, (int status, Object data) -> {
            if (status == SUCCESS) {
                Boolean isFavorite = (Boolean) data;
                databaseInteractor.setUpMyFavoritePost(mPost, !isFavorite);
                callback.callBack(SUCCESS, !isFavorite);
            } else if (status == FAIL) {
                callback.callBack(FAIL, null);
            }
        });
    }

    private void isItMyFavoritePost(Post post, final BasicCallBack callback) {
        databaseInteractor.isItMyFavoritePost(post, (int status, Object data) -> {
            if (status == SUCCESS) {
                Boolean isFavorite = (Boolean) data;
                callback.callBack(SUCCESS, isFavorite);
            } else if (status == FAIL) {
                callback.callBack(FAIL, null);
            }
        });
    }

    private void sendLikeTypePushNotification() {
        databaseInteractor.getUser(mPost.uid, (int status, Object data) -> {
            if (status == SUCCESS) {
                User recipientUser = (User) data;
                databaseInteractor.currentUser((int status2, Object data2) -> {
                    if (status2 == SUCCESS) {
                        User senderUser = (User) data2;
                        RemoteNotifications.sendNotification(recipientUser, senderUser, Constants.NOTIFICATION_TYPE_LIKE, mPost.title);
                    }
                });
            }
        });
    }

    // Show the post photo
    private void photoPreview() {
        Intent intent = new Intent( PostDetailActivity.this, PhotoBrowserActivity.class);
        intent.putExtra("post", mPost);
        this.startActivity(intent);
    }

    private void sendComment() {
        if (mPost == null) {
            return;
        }

        String commentText = mCommentField.getText().toString();

        if (commentText.isEmpty()) {
            return;
        }

        databaseInteractor.addCommentToPost(mPost, commentText, (int status, Object data) -> {
            if (status == SUCCESS) {
                // Clear the field
                mCommentField.setText(null);
                Utils.hideSoftKeyboard(this);
            } else if (status == FAIL) {
                Toast.makeText(this, "Send message is failed", Toast.LENGTH_SHORT).show();
            } else if (status == CANCEL) {
                Toast.makeText(this, "Send message is cancelled", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private static class CommentViewHolder extends RecyclerView.ViewHolder {

        public ImageView authorPhoto;
        public TextView authorView;
        public TextView bodyView;

        public CommentViewHolder(View itemView) {
            super(itemView);

            authorPhoto = itemView.findViewById(R.id.comment_photo);
            authorView = itemView.findViewById(R.id.comment_author);
            bodyView = itemView.findViewById(R.id.comment_body);
        }
    }

    private static class CommentAdapter extends RecyclerView.Adapter<CommentViewHolder> {
        private CommentObserver mObserver;
        private Context mContext;

        private List<String> mCommentIds = new ArrayList<>();
        private List<Comment> mComments = new ArrayList<>();

        public CommentAdapter(final Context context, String postId, final BasicCallBack collback) {
            mContext = context;
            mObserver = new CommentObserver();
            mObserver.addObserver(postId, new CommentObserverCallback() {
                @Override
                public void addComment(Comment comment, String id){
                    Log.d(TAG, "onChildAdded:" + id);

                    // [START_EXCLUDE]
                    // Update RecyclerView
                    mCommentIds.add(id);
                    mComments.add(comment);

                    Collections.sort(mComments, new Comparator<Comment>() {
                        public int compare(Comment c1, Comment c2) {
                            return c1.created < c2.created ? 1 : -1;
                        }
                    });

                    collback.callBack(0, null);

                    notifyItemInserted(0);
                    // [END_EXCLUDE]
                }

                @Override
                public void updateComment(Comment comment, String id) {
                    Log.d(TAG, "onChildChanged:" + id);

                    // [START_EXCLUDE]
                    int commentIndex = mCommentIds.indexOf(id);
                    if (commentIndex > -1) {
                        // Replace with the new data
                        mComments.set(commentIndex, comment);

                        // Update the RecyclerView
                        notifyItemChanged(commentIndex);
                    } else {
                        Log.w(TAG, "onChildChanged:unknown_child:" + id);
                    }
                    // [END_EXCLUDE]
                }

                @Override
                public void deleteComment(String id) {
                    Log.d(TAG, "onChildRemoved:" + id);

                    // A comment has changed, use the key to determine if we are displaying this
                    // comment and if so remove it.
                    String commentKey = id;

                    // [START_EXCLUDE]
                    int commentIndex = mCommentIds.indexOf(commentKey);
                    if (commentIndex > -1) {
                        // Remove data from the list
                        mCommentIds.remove(commentIndex);
                        mComments.remove(commentIndex);

                        // Update the RecyclerView
                        notifyItemRemoved(commentIndex);
                    } else {
                        Log.w(TAG, "onChildRemoved:unknown_child:" + commentKey);
                    }
                    // [END_EXCLUDE]
                }

                @Override
                public void moveComment(Comment comment, String id) {
                    Log.d(TAG, "onChildMoved:" + id);

                    // A comment has changed position, use the key to determine if we are
                    // displaying this comment and if so move it.
                    Comment movedComment = comment;
                    String commentKey = id;

                    // ...

                }

                @Override
                public void cancelled(DatabaseError databaseError) {
                    Log.w(TAG, "postComments:onCancelled", databaseError.toException());
                    Toast.makeText(mContext, "Failed to load comments.",
                            Toast.LENGTH_SHORT).show();
                }
            });
        }

        @Override
        public CommentViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            LayoutInflater inflater = LayoutInflater.from(mContext);
            View view = inflater.inflate(R.layout.item_comment, parent, false);
            return new CommentViewHolder(view);
        }

        @Override
        public void onBindViewHolder(CommentViewHolder holder, int position) {
            Comment comment = mComments.get(position);
            holder.authorView.setText(comment.author);
            holder.bodyView.setText(comment.text);

            DatabaseInteractor databaseInteractor = DatabaseFactory.getDatabaseInteractor();
            databaseInteractor.downloadPhoto(null, comment.uid, (int status, Object data) -> {
                if (status == SUCCESS) {
                    Uri uri = (Uri) data;
                    GlideApp.with(mContext.getApplicationContext())
                            .load(uri.toString())
                            .apply(bitmapTransform(new PositionedCropTransformation(1, 0)))
                            .into(holder.authorPhoto);
                }
            });

        }

        @Override
        public int getItemCount() {
            return mComments.size();
        }

        public void cleanupListener() {
            mObserver.unregisterServerObserver();
        }
    }

    // http://wisdomitsol.com/blog/android/sending-email-in-android-without-using-the-default-built-in-application

    private void sendEmail() {

        databaseInteractor.getUser(mPost.uid, (int status, Object data) -> {
            if (status == SUCCESS) {
                User user = (User) data;

                String TO = user.email;
                String SUBJECT = mPost.title;
                String MESSAGE = "Message";

                Intent intent = new Intent(Intent.ACTION_SEND);

                intent.putExtra(Intent.EXTRA_EMAIL, new String[]{TO});
                intent.putExtra(Intent.EXTRA_SUBJECT, SUBJECT);
                intent.putExtra(Intent.EXTRA_TEXT, MESSAGE);

                intent.setType("message/rfc822");

                startActivity(Intent.createChooser(intent, "Select Email Sending App :"));
            }
        });
    }

}
