package dk.coded.emia.View.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.Spinner;
import android.widget.TextView;

import org.florescu.android.rangeseekbar.RangeSeekBar;

import butterknife.ButterKnife;
import dk.coded.emia.model.adapter.PostsListAdapter;
import dk.coded.emia.utils.Constants;
import dk.coded.emia.model.adapter.FilterStorage;
import dk.coded.emia.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

import butterknife.BindView;

public class PostFilterActivity extends BaseActivity {

    private static final String TAG = "PostFilterActivity";

    private Activity activity = PostFilterActivity.this;

    private int ageMax, ageMin, lookingFor, favoriteStatus;
    private FilterStorage.Filter filter;

    private PostsListAdapter adapter;

    @BindView(R.id.rlFilterWrapper) RelativeLayout rlFilterWrapper;
    @BindView(R.id.tvAge) TextView tvAge;
    @BindView(R.id.mlAge) RangeSeekBar mlAge;
    @BindView(R.id.rbFilterSex) RadioGroup rbFilterSex;
    @BindView(R.id.rbFilterStatus) RadioGroup rbFilterStatus;
    @BindView(R.id.rbGuys) RadioButton rbGuys;
    @BindView(R.id.rbGirls) RadioButton rbGirls;
    @BindView(R.id.rbBoth) RadioButton rbBoth;
    @BindView(R.id.rbAll) RadioButton rbAll;
    @BindView(R.id.rbMyFavorite) RadioButton rbMyFavorite;
    @BindView(R.id.llFilterWrapper) LinearLayout llFilterWrapper;
    @BindView(R.id.municipalities_spinner) Spinner municipalitySpinner;

    @BindView(R.id.nav_bar_title_tv) TextView titleEditText;
    @BindView(R.id.back_button) ImageButton mBackButton;
    @BindView(R.id.star_button) ImageButton mStarButton;
    @BindView(R.id.run_filter_button) ImageButton mDoneButton;
    @BindView(R.id.rlNotification) RelativeLayout rlNotification;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_filter);
        ButterKnife.bind(this);

        titleEditText.setText(getResources().getString(R.string.filter_title));

        setUpButtonListeners();
        setUpSpinnerMunicipality();
        setUpDoneButton();

        //prepareNotificationsListener(this);
        rlNotification.setVisibility(View.GONE);
        mStarButton.setVisibility(View.GONE);
    }

    private void setUpDoneButton() {
        mDoneButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FilterStorage.getInstance().setFilter(filter, PostFilterActivity.this);
                finish();
            }
        });
    }

    private void setUpButtonListeners() {
        mBackButton.setOnClickListener(view -> finish());
    }

    private void setUpSpinnerMunicipality() {
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
        municipalitySpinner.setAdapter(dataAdapter);
    }

    @Override
    public void onStart() {
        super.onStart();

        setupFilter();
    }

    @Override
    public void onStop() {
        super.onStop();

    }

    private void setupFilter() {

        filter = FilterStorage.getInstance().getFilter(this);

        ageMin = filter.ageMin;
        ageMax = filter.ageMax;
        lookingFor = filter.gender;
        favoriteStatus = filter.status;

        tvAge.setText(ageMin + " - " + ageMax);

        rbFilterSex.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                switch (checkedId) {
                    case R.id.rbGuys:
                        filter.gender = Constants.GENDER_GUY;
                        lookingFor = Constants.GENDER_GUY;
                        break;
                    case R.id.rbGirls:
                        filter.gender = Constants.GENDER_GIRL;
                        lookingFor = Constants.GENDER_GIRL;
                        break;
                    case R.id.rbBoth:
                        filter.gender = Constants.GENDER_BOTH;
                        lookingFor = Constants.GENDER_BOTH;
                        break;
                }
            }
        });

        switch (lookingFor) {
            case Constants.GENDER_GUY:
                rbFilterSex.check(R.id.rbGuys);
                break;
            case Constants.GENDER_GIRL:
                rbFilterSex.check(R.id.rbGirls);
                break;
            case Constants.GENDER_BOTH:
                rbFilterSex.check(R.id.rbBoth);
                break;
        }

        rbFilterStatus.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                switch (checkedId) {
                    case R.id.rbAll:
                        filter.status = Constants.STATUS_ALL;
                        favoriteStatus = Constants.STATUS_ALL;
                        break;
                    case R.id.rbMyFavorite:
                        filter.status = Constants.STATUS_MY_FAVORITE;
                        favoriteStatus = Constants.STATUS_MY_FAVORITE;
                        break;
                }
            }
        });

        switch (favoriteStatus) {
            case Constants.STATUS_ALL:
                rbFilterStatus.check(R.id.rbAll);
                break;
            case Constants.STATUS_MY_FAVORITE:
                rbFilterStatus.check(R.id.rbMyFavorite);
                break;
        }

        mlAge.setRangeValues(Constants.FILTER_MIN_AGE_LIMIT, Constants.FILTER_MAX_AGE_LIMIT);
        mlAge.setSelectedMinValue(ageMin);
        mlAge.setSelectedMaxValue(ageMax);

        mlAge.setOnRangeSeekBarChangeListener(new RangeSeekBar.OnRangeSeekBarChangeListener<Integer>() {
            @Override
            public void onRangeSeekBarValuesChanged(RangeSeekBar<?> bar, Integer minValue, Integer maxValue) {
                tvAge.setText(minValue + " - " + maxValue);
                filter.ageMin = minValue;
                filter.ageMax = maxValue;
                ageMin = minValue;
                ageMax = maxValue;
            }
        });
    }

}
