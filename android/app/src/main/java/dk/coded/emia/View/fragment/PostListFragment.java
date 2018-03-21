package dk.coded.emia.View.fragment;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

import dk.coded.emia.AsymmetricGridViewAdapter;
import dk.coded.emia.AsymmetricGridView;
import dk.coded.emia.Utils;

import dk.coded.emia.R;
import dk.coded.emia.View.activity.MainActivity;
import dk.coded.emia.View.activity.PostDetailActivity;
import dk.coded.emia.model.Data.Post;
import dk.coded.emia.model.Data.User;
import dk.coded.emia.model.adapter.FilterStorage;
import dk.coded.emia.model.adapter.PostListValidator;
import dk.coded.emia.model.adapter.PostsCollectionViewItem;
import dk.coded.emia.model.adapter.PostsListAdapter;
import dk.coded.emia.utils.BasicCallBack;

public abstract class PostListFragment extends Fragment implements AdapterView.OnItemClickListener {

    private static final String TAG = "PostListFragment";

    private LinearLayoutManager mLayoutManager;
    private ListView mListView;
    private PostsListAdapter mAdapter;
    private MainScreenRouter mRouter;

    private Activity mActivity;
    protected PostListValidator mValidator;

    public PostListFragment() {}

    public abstract void needShow(Post post, User user, BasicCallBack callback);

    @Override
    public View onCreateView (LayoutInflater inflater, ViewGroup container,
                              Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);

        mActivity = getActivity();

        mValidator = new PostListValidator(mActivity);

        View rootView = inflater.inflate(R.layout.fragment_all_posts, container, false);

        mLayoutManager = new LinearLayoutManager(mActivity);

        mRouter = new MainScreenRouter(mActivity, mActivity, mActivity);

        mListView = createListView(rootView);

        mAdapter = configureListViewAdapter(mListView);

        return rootView;
    }

    // https://github.com/felipecsl/AsymmetricGridView
    private ListView createListView(View rootView) {
        AsymmetricGridView gridView = (AsymmetricGridView) rootView.findViewById(R.id.messages_list);
        Context activity = getActivity();
        gridView.setRequestedColumnCount(2);
        gridView.setBackgroundColor(Color.parseColor("#FFFFFF"));
        gridView.setRequestedHorizontalSpacing(Utils.dpToPx(activity, 3));
        gridView.setDebugging(true);
        gridView.setOnItemClickListener(this);
        return gridView;
    }

    private PostsListAdapter configureListViewAdapter(ListView listView) {
        Context activity = getActivity();
        AsymmetricGridView asymmetricGridView = (AsymmetricGridView) listView;
        PostsListAdapter adapter = new PostsListAdapter(activity);
        // We use just needShow method. TODO: make interface with needShow method
        adapter.showPostsStrategy = this;
        AsymmetricGridViewAdapter listViewAdapter = new AsymmetricGridViewAdapter(activity, asymmetricGridView, adapter);
        listView.setAdapter(listViewAdapter);
        return adapter;
    }

    @Override public void onItemClick(@NonNull AdapterView<?> parent, @NonNull View view,
                                      int position, long id) {
        PostsCollectionViewItem item = (PostsCollectionViewItem) mAdapter.getItem(position);
        Post post = item.post;
        mRouter.browsePost(post);
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        // Set up Layout Manager, reverse layout
        mLayoutManager.setReverseLayout(true);
        mLayoutManager.setStackFromEnd(true);
    }

    @Override
    public void onStart() {
        super.onStart();

        startSearchListening();
        startDataListening();
    }

    @Override
    public void onStop() {
        super.onStop();

        stopSearchListening();
        stopDataListening();
    }

    public void onSaveInstanceState(Bundle outState) {
        outState.putInt("itemCount", mAdapter.getCount());
        for (int i = 0; i < mAdapter.getCount(); i++) {
            outState.putParcelable("item_" + i, (Parcelable) mAdapter.getItem(i));
        }
    }

    public void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        int count = savedInstanceState.getInt("itemCount");
        List<PostsCollectionViewItem> items = new ArrayList<>(count);
        for (int i = 0; i < count; i++) {
            items.add((PostsCollectionViewItem) savedInstanceState.getParcelable("item_" + i));
        }
        mAdapter.setItems(items);
    }

    private void startSearchListening() {
        FilterStorage.getInstance().setListener(new FilterStorage.ValueFilterListener() {
            @Override
            public void onSearchTextChange(String newSearchTemplate) {
                Log.d(TAG, "Search data with template " + newSearchTemplate);
                startDataListening();
            }
        });
    }

    private void stopSearchListening() {
        FilterStorage.getInstance().setListener(null);
    }

    private void startDataListening() {
        if (mAdapter != null) {
            mAdapter.startListening();
        }
    }

    private void stopDataListening() {
        if (mAdapter != null) {
            mAdapter.stopListening();
        }
    }

    /**
     * Created by oldman on 11/26/17.
     */

    public static class MainScreenRouter {

        private Activity _activity;
        private Context _context;
        private Context _packageContext;

        MainScreenRouter(Activity activity, Context context, Context packageContext) {
            _activity = activity;
            _context = context;
            _packageContext = packageContext;
        }

        public void startMainScreen() {
            _activity.startActivity(new Intent(_packageContext, MainActivity.class));
            _activity.finish();
        }

        public void browsePost(Post post) {
            Intent intent = new Intent(_packageContext, PostDetailActivity.class);
            intent.putExtra("post", post);
    //        intent.putExtra(PostDetailActivity.EXTRA_POST_KEY, post.id);
            _activity.startActivity(intent);
        }

    }
}
