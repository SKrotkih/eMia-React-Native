/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package dk.coded.emia.View.activity;

import android.app.Activity;
import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.support.v7.widget.Toolbar;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.SearchView;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;

import butterknife.BindView;
import butterknife.ButterKnife;
import dk.coded.emia.R;
import dk.coded.emia.View.pages.MyPostsFragment;
import dk.coded.emia.View.pages.MyFavoritePostsFragment;
import dk.coded.emia.View.pages.RecentPostsFragment;
import dk.coded.emia.model.adapter.FilterStorage;
import dk.coded.emia.model.interactor.DatabaseFactory;
import dk.coded.emia.model.interactor.DatabaseInteractor;
import dk.coded.emia.notifications.LocalNotificationListener;
import dk.coded.emia.notifications.LocalNotificationReceiver;
import dk.coded.emia.notifications.RemoteNotifications;
import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.Utils;

public class  MainActivity extends BaseActivity implements LocalNotificationListener {

    private static final String TAG = "MainActivity";

    Activity activity = MainActivity.this;
    private FragmentPagerAdapter mPagerAdapter;
    private ViewPager mViewPager;

    @BindView(R.id.fab_new_post) ImageButton mNewPostButton;
    @BindView(R.id.filter_button) ImageButton mFilterButton;
    @BindView(R.id.toolbar) Toolbar mToolbar;
    @BindView(R.id.rlNotification) RelativeLayout rlNotification;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ButterKnife.bind(this);

        initToolBar();
        initPageAdapter();
        initFilterButton();
        initNewPostButton();
        prepareNotificationsListener(activity);
        rlNotification.setVisibility(View.GONE);
    }

    @Override
    public void onResume(){
        super.onResume();
    }

    @Override
    public void onPause(){
        super.onPause();
    }

    private void initFilterButton() {
        mFilterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, PostFilterActivity.class));
            }
        });
    }

    private void initNewPostButton() {
        // Button launches NewPostActivity
        mNewPostButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, NewPostActivity.class));
            }
        });
    }

    private void initPageAdapter() {
        // Create the adapter that will return a fragment for each section
        mPagerAdapter = new FragmentPagerAdapter(getSupportFragmentManager()) {
            private final Fragment[] mFragments = new Fragment[] {
                    new RecentPostsFragment(),
                    new MyPostsFragment(),
                    new MyFavoritePostsFragment(),
            };
            private final String[] mFragmentNames = new String[] {
                    getString(R.string.heading_recent),
                    getString(R.string.heading_my_posts),
                    getString(R.string.heading_my_top_posts)
            };
            @Override
            public Fragment getItem(int position) {
                return mFragments[position];
            }
            @Override
            public int getCount() {
                return mFragments.length;
            }
            @Override
            public CharSequence getPageTitle(int position) {
                return mFragmentNames[position];
            }
        };
        // Set up the ViewPager with the sections adapter.
        mViewPager = findViewById(R.id.container);
        mViewPager.setAdapter(mPagerAdapter);
        TabLayout tabLayout = findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(mViewPager);
    }

    private void initToolBar() {
        mToolbar.setTitle(R.string.app_name);
        mToolbar.setTitleTextColor(Utils.getColor(this, android.R.color.white));

        setSupportActionBar(mToolbar);

//        toolbar.setNavigationIcon(R.drawable.ic_toolbar_arrow);
//        toolbar.setNavigationOnClickListener(
//                new View.OnClickListener() {
//                    @Override
//                    public void onClick(View v) {
//                        Toast.makeText(AndroidToolbarExample.this, "clicking the toolbar!", Toast.LENGTH_SHORT).show();
//                    }
//                }
//
//        );
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        createSearchMenu(menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int i = item.getItemId();
        if (i == R.id.action_my_profile) {
            startActivity(new Intent(this, MyProfileActivity.class));
            return true;
        } else if (i == R.id.action_logout) {
            DatabaseInteractor interactor = DatabaseFactory.getDatabaseInteractor();
            interactor.logOut();
            startActivity(new Intent(this, SignInActivity.class));
            return true;
        } else {
            return super.onOptionsItemSelected(item);
        }
    }

    private void createSearchMenu(Menu menu) {

        //getting the search view from the menu
        MenuItem searchViewItem = menu.findItem(R.id.menuSearch);

        //getting search manager from systemservice
        SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);

        //getting the search view
        final SearchView searchView = (SearchView) searchViewItem.getActionView();

        //you can put a hint for the search input field
        searchView.setQueryHint("Enter a search template...");

        // focus listener
        searchView.setOnQueryTextFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View view, boolean b) {
                if (b) {
                    ((SearchView)view).setQuery(FilterStorage.getInstance().getSearchText(MainActivity.this), false);
                }
            }
        });

        searchView.setSearchableInfo(searchManager.getSearchableInfo(getComponentName()));

        //by setting it true we are making it iconified
        //so the search input will show up after taping the search iconified
        //if you want to make it visible all the time make it false
        searchView.setIconifiedByDefault(true);

        //here we will get the search query
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String text) {
                FilterStorage.getInstance().setSearchText(text, MainActivity.this);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                FilterStorage.getInstance().setSearchText(newText, MainActivity.this);
                return false;
            }
        });
    }

}
