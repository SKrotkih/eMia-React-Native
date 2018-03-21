package dk.coded.emia.model.adapter;

import android.content.Context;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import dk.coded.emia.R;
import dk.coded.emia.View.GlideApp;
import dk.coded.emia.View.fragment.PostListFragment;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.comparator.PostComparator;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.observer.PostObserver;
import dk.coded.emia.model.observer.PostObserverProtocol;
import dk.coded.emia.model.observer.UserObserver;
import dk.coded.emia.model.observer.UserObserverProtocol;
import dk.coded.emia.utils.PositionedCropTransformation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.bumptech.glide.request.RequestOptions.bitmapTransform;
import static dk.coded.emia.utils.Constants.FAIL;
import static dk.coded.emia.utils.Constants.SUCCESS;

public class PostsListAdapter extends ArrayAdapter<PostsCollectionViewItem> implements PostsListAdapterProtocol, PostObserverProtocol, UserObserverProtocol {

  private Context mContext;
  private DatabaseInteractor mInteractor;
  private int mDecCounter;
  public PostListFragment showPostsStrategy;

  private List<User> mUsers;

  public PostsListAdapter(Context context) {
    super(context, 0);
    mContext = context;
    mUsers = new ArrayList<>();
    mInteractor = DatabaseFactory.getDatabaseInteractor();
  }

  public void startListening() {
    UserObserver.getInstance().register(this, mContext);
  }

  // UserObserverProtocol
  public void updateUsers(List<User> users) {
    mUsers.clear();
    mUsers.addAll(users);
    PostObserver.getInstance().register(this, mContext);
  }

  public void newUser(User user) {
    mUsers.add(user);
  }

  // PostObserverProtocol
  public void update(List<Post> posts) {
    presentFilteredData(posts);
  }

  public void newPost(Post post) {
    User user = getUser(post);
    showPostsStrategy.needShow(post, user, (int status, Object data) -> {
        if (status == SUCCESS) {
          Boolean success = (Boolean) data;
          if (success) {
            int colSpan = 1;
            // TODO: something like this. But it does not work!
            // int rowSpan = post.photoHeight() > post.photoWidth() ? 2 : 1;
            int rowSpan = post.photoHeight() > post.photoWidth() ? 1 : 1;
            PostsCollectionViewItem coolectionItem = new PostsCollectionViewItem(colSpan, rowSpan, 0);
            coolectionItem.post = post;
            List<PostsCollectionViewItem> items = new ArrayList<>();
            items.add(coolectionItem);
            insert(coolectionItem, 0);
          }
        }
    });
  }

  private void presentFilteredData(List<Post> posts) {
    if (posts.size() == 0) {
      return;
    }
    List<PostsCollectionViewItem> filteredItems = new ArrayList<>();
    int decCounter = posts.size();
    mDecCounter = posts.size();
    for (Post item : posts) {
      User user = getUser(item);
      showPostsStrategy.needShow(item, user, (int status, Object data) -> {
          Boolean success = (Boolean) data;
          if (status == SUCCESS) {
            mDecCounter--;
            if (success) {
              int colSpan = 1;
              // TODO: something like this. But it does not work!
              // int rowSpan = item.photoHeight() > item.photoWidth() ? 2 : 1;
              int rowSpan = item.photoHeight() > item.photoWidth() ? 1 : 1;
              PostsCollectionViewItem coolectionItem = new PostsCollectionViewItem(colSpan, rowSpan, 0);
              coolectionItem.post = item;
              filteredItems.add(coolectionItem);
            }
            if (mDecCounter == 0) {
              Collections.sort(filteredItems, new PostComparator());
              setItems(filteredItems);
            }
          }
      });
    }
  }

  private User getUser(Post post) {
    User author = null;
    for(User user : mUsers) {
      if (user.id.equals(post.uid)) {
        author = user;
        break;
      }
    }
    return author;
  }

  private void showData(View view, Post post) {
    TextView titleTextView = (TextView) view.findViewById(R.id.titleTextView);
    TextView descriptionTextView = (TextView) view.findViewById(R.id.descriptionTextView);
    final ImageView photoImageView = (ImageView)  view.findViewById(R.id.photoImageView);
    ImageButton starButton =  (ImageButton)  view.findViewById(R.id.star_button);

    mInteractor.downloadPhoto(mContext, post.id, (int status, Object data) -> {
      if (status == SUCCESS) {
        Uri uri = (Uri) data;
        GlideApp.with(mContext.getApplicationContext())
                .load(uri.toString())
                .apply(bitmapTransform(new PositionedCropTransformation(1, 0)))
                .into(photoImageView);
      }
    });

    titleTextView.setText(post.title);
    descriptionTextView.setText(post.body);
    starButton.setVisibility(View.GONE);

    mInteractor.isItMyFavoritePost(post, (int status, Object data) -> {
      if (status == SUCCESS) {
        Boolean isFavorite = (Boolean) data;
        if (isFavorite) {
          starButton.setVisibility(View.VISIBLE);
        }
      } else if (status == FAIL) {

      }
    });
  }

  public void stopListening() {
    PostObserver.getInstance().unregister(this);
  }

  @Override
  public View getView(int position, View convertView, @NonNull ViewGroup parent) {
    PostsCollectionViewItem item = getItem(position);
    View view = bindData(item.post, convertView, parent, item.getRowSpan());
    return view;
  }

  private View bindData(Post post, View convertView, @NonNull ViewGroup parent, int rowSpan) {
    View view;
    LayoutInflater layoutInflater = LayoutInflater.from(mContext);
    if (convertView == null) {
      view = layoutInflater.inflate(R.layout.horizontal_message_cell, parent, false);
    } else {
      view = convertView;
    }
    showData(view, post);
    return view;
  }

  @Override public int getViewTypeCount() {
    return 2;
  }

  public void appendItems(List<PostsCollectionViewItem> newItems) {
    addAll(newItems);
    notifyDataSetChanged();
  }

  public void setItems(List<PostsCollectionViewItem> moreItems) {
    clear();
    appendItems(moreItems);
  }
}
