package com.emia;

import com.facebook.react.ReactActivity;

// React Native docs
// http://reactnativedocs.ru/docs/state.html#content

//  https://reactnative.dev/docs/integration-with-existing-apps:
// react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/\app/\src/\main/\assets/\index.android.bundle --assets-dest android\app\src\main\res


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "eMia";
    }
}
