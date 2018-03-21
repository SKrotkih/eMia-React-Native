package dk.coded.emia.model.adapter;

import android.app.Activity;

import java.io.Serializable;

import dk.coded.emia.utils.Constants;
import dk.coded.emia.utils.Utils;

/**
 * Created by oldman on 1/1/18.
 */

public class FilterStorage implements Serializable {

    private static volatile FilterStorage sDefaltInstance;

    //private constructor.
    private FilterStorage(){

        //Prevent form the reflection api.
        if (sDefaltInstance != null){
            throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
        }
    }

    public static FilterStorage getInstance() {
        if (sDefaltInstance == null) { //if there is no instance available... create new one
            synchronized (FilterStorage.class) {
                if (sDefaltInstance == null) {
                    sDefaltInstance = new FilterStorage();
                }
            }
        }

        return sDefaltInstance;
    }

    //Make singleton from serialize and deserialize operation.
    protected FilterStorage readResolve() {
        return getInstance();
    }

    public interface ValueFilterListener {
        void onSearchTextChange(String newSearchTemplate);
    }

    public class Filter {
        public Integer ageMin;
        public Integer ageMax;
        public Integer gender;
        public Integer status;
    }

    public Filter getFilter(Activity activity) {
        Filter filter = new Filter();
        filter.ageMin = getAgeMin(activity);
        filter.ageMax = getAgeMax(activity);
        filter.gender = getGender(activity);
        filter.status = getStatus(activity);
        return filter;
    }

    public void setFilter(Filter filter, Activity activity) {
         setAgeMin(filter.ageMin, activity);
         setAgeMax(filter.ageMax, activity);
         setGender(filter.gender, activity);
         setStatus(filter.status, activity);
    }

    private ValueFilterListener mListener;

    public void setListener(ValueFilterListener listener) {
        mListener = listener;
    }

    private Integer getAgeMin(Activity activity) {
        Integer ageMin = Utils.getIntPreference(activity, Constants.EXTRA_FILTER_AGE_MIN, Constants.FILTER_MIN_AGE);
        return ageMin;
    }

    private void setAgeMin(Integer ageMin, Activity activity) {
        Utils.setIntPreference(activity, Constants.EXTRA_FILTER_AGE_MIN, ageMin);
    }

    private Integer getAgeMax(Activity activity) {
        Integer ageMax = Utils.getIntPreference(activity, Constants.EXTRA_FILTER_AGE_MAX, Constants.FILTER_MAX_AGE);
        return ageMax;
    }

    private void setAgeMax(Integer ageMax, Activity activity) {
        Utils.setIntPreference(activity, Constants.EXTRA_FILTER_AGE_MAX, ageMax);
    }

    private Integer getGender(Activity activity) {
        Integer lookingFor = Utils.getIntPreference(activity, Constants.EXTRA_FILTER_GENDER, Constants.GENDER_BOTH);
        return lookingFor;
    }

    private void setGender(Integer gender, Activity activity) {
        Utils.setIntPreference(activity, Constants.EXTRA_FILTER_GENDER, gender);
    }

    private Integer getStatus(Activity activity) {
        Integer favoriteStatus = Utils.getIntPreference(activity, Constants.EXTRA_FILTER_STATUS, Constants.STATUS_MY_FAVORITE);
        return favoriteStatus;
    }

    private void setStatus(Integer status, Activity activity) {
        Utils.setIntPreference(activity, Constants.EXTRA_FILTER_STATUS, status);
    }

    public String getSearchText(Activity activity) {
        String text = Utils.getStringPreference(activity, Constants.EXTRA_SEARCH_TEXT);
        if (text != null && !text.isEmpty()) {
            text= text.trim();
        }
        return text;
    }

    public void setSearchText(String text, Activity activity) {
        Utils.setStringPreference(activity, Constants.EXTRA_SEARCH_TEXT, text);
        if (mListener != null) {
            mListener.onSearchTextChange(text);
        }
    }

}
