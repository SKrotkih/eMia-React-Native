package dk.coded.emia.utils;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.request.target.BaseTarget;
import com.bumptech.glide.request.target.SizeReadyCallback;
import com.bumptech.glide.request.transition.Transition;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import dk.coded.emia.R;
import dk.coded.emia.View.GlideApp;
import dk.coded.emia.View.activity.NewPostActivity;

import static android.app.Activity.RESULT_OK;

/**
 * Created by oldman on 12/9/17.
 */

public final class PhotosManager {

    private static final int PICK_IMAGE_REQUEST = 100;
    private static final int CAMERA_TAKE_REQUEST = 200;
    private static int PHOTO_MAX_WIDTH = 1024;
    private static int PHOTO_MAX_HEIGHT = 768;
    private static final int ALL_PERMISSIONS_RESULT = 101;

    private ArrayList<String> permissions = new ArrayList<>();
    private ArrayList<String> permissionsToRequest;
    private ArrayList<String> permissionsRejected = new ArrayList<>();

    private File file;
    private Uri uri;

    private Activity parentActivity;
    private PhotosManagerDelegate delegate;

    private ProgressBarHandler activityIndicator;

    public void showPhotoDialog(Activity parentActivity, PhotosManagerDelegate delegate) {

        this.parentActivity = parentActivity;
        this.activityIndicator = new ProgressBarHandler(parentActivity);
        this.delegate = delegate;

        permissions.add(Manifest.permission.CAMERA);
        permissions.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        permissionsToRequest = findUnAskedPermissions(permissions);

        final String[] items = new String[] {"Capture Photo", "Choose from Gallery", "Cancel"};

        TextView myMsg = new TextView(this.parentActivity);
        myMsg.setText("Add Photo");
        myMsg.setGravity(Gravity.CENTER_HORIZONTAL);
        myMsg.setPadding(10, 10, 10, 10);
        myMsg.setTextSize(20);
        myMsg.setTextColor(this.parentActivity.getResources().getColor(R.color.colorPrimary));

        activityIndicator.show();

        final Activity activity = this.parentActivity;
        final ProgressBarHandler progressIndicator = this.activityIndicator;

        AlertDialog.Builder builder = new AlertDialog.Builder(activity);
        builder.setCustomTitle(myMsg);
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (items[item].equals("Capture Photo")) {

                    //Log.d(Constants.TAG, "permissionsToRequest: " + permissionsToRequest.size());
                    if(checkCameraExists()) {
                        if (permissionsToRequest.size() > 0) {
                            activity.requestPermissions(permissionsToRequest.toArray(new String[permissionsToRequest.size()]), ALL_PERMISSIONS_RESULT);
                        } else {
                            //Toast.makeText(activity, "Permissions already granted.", Toast.LENGTH_LONG).show();
                            launchCamera();
                        }
                    } else {
                        Toast.makeText(activity, "Camera not available.", Toast.LENGTH_SHORT).show();
                        progressIndicator.hide();
                    }

                } else if (items[item].equals("Choose from Gallery")) {
                    Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                    intent.setType("image/*");
                    activity.startActivityForResult(intent, PICK_IMAGE_REQUEST);
                } else if (items[item].equals("Cancel")) {
                    dialog.dismiss();
                    progressIndicator.hide();
                }
            }
        });
        builder.show();
    }

    public boolean checkCameraExists() {
        return this.parentActivity.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA);
    }

    private void showMessageOKCancel(String message, DialogInterface.OnClickListener okListener) {
        new AlertDialog.Builder(this.parentActivity)
                .setMessage(message)
                .setPositiveButton("OK", okListener)
                .setNegativeButton("Cancel", null)
                .create()
                .show();
    }

    private void launchCamera() {
        Intent intent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
        file = getOutputMediaFile();
        uri = FileProvider.getUriForFile(this.parentActivity, this.parentActivity.getApplicationContext().getPackageName() + ".dk.coded.emia.provider", file);
        intent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, uri);
        this.parentActivity.startActivityForResult(intent, CAMERA_TAKE_REQUEST);
    }

    private static File getOutputMediaFile(){
        File mediaStorageDir = new File(Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_PICTURES), "@string/appName");

        if (!mediaStorageDir.exists()){
            if (!mediaStorageDir.mkdirs()){
                Log.d("@string/appName", "failed to create directory");
                return null;
            }
        }

        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        return new File(mediaStorageDir.getPath() + File.separator +
                "IMG_"+ timeStamp + ".jpg");
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        final ProgressBarHandler progressIndicator = this.activityIndicator;
        final PhotosManagerDelegate _delegate = this.delegate;

        switch(requestCode){
            case PICK_IMAGE_REQUEST:
                if(resultCode == RESULT_OK){
                    Uri selectedImage = data.getData();
                    BaseTarget bs = new BaseTarget<Bitmap>(){
                        @Override
                        public void onResourceReady(Bitmap resource, Transition<? super Bitmap> transition) {
                            _delegate.setPhoto(resource);
                            progressIndicator.hide();
                        }

                        @Override
                        public void removeCallback(SizeReadyCallback cb) {}

                        @Override
                        public void getSize(SizeReadyCallback cb) {}
                    };

                    GlideApp.with(this.parentActivity.getApplicationContext()).asBitmap()
                            .load(ImageFilePath.getPath(this.parentActivity.getApplicationContext(), selectedImage))
                            .override(PHOTO_MAX_WIDTH, PHOTO_MAX_HEIGHT)
                            .fitCenter().into(bs);
                }
                break;
            case CAMERA_TAKE_REQUEST:
                BaseTarget bs = new BaseTarget<Bitmap>(){
                    @Override
                    public void onResourceReady(Bitmap resource, Transition<? super Bitmap> transition) {
                        _delegate.setPhoto(resource);
                        progressIndicator.hide();
                    }

                    @Override
                    public void removeCallback(SizeReadyCallback cb) {}

                    @Override
                    public void getSize(SizeReadyCallback cb) {}
                };

                GlideApp.with(this.parentActivity.getApplicationContext()).asBitmap()
                        .load(file.getAbsolutePath())
                        .override(PHOTO_MAX_WIDTH, PHOTO_MAX_HEIGHT)
                        .fitCenter().into(bs);
                break;
        }
    }

    //
    // Permissions
    //

    private ArrayList findUnAskedPermissions(ArrayList<String> wanted) {
        ArrayList result = new ArrayList();

        for (String perm : wanted) {
            if (!hasPermission(perm)) {
                result.add(perm);
            }
        }

        return result;
    }

    private boolean hasPermission(String permission) {
        if (canAskPermission()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                return (this.parentActivity.checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED);
            }
        }
        return true;
    }

    private boolean canAskPermission() {
        return (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1);
    }

    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {

        final Activity activity = this.parentActivity;

        switch (requestCode) {
            case ALL_PERMISSIONS_RESULT:
                for (String perms : permissionsToRequest) {
                    if (!hasPermission(perms)) {
                        permissionsRejected.add(perms);
                    }
                }

                if (permissionsRejected.size() > 0) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        if (this.parentActivity.shouldShowRequestPermissionRationale(permissionsRejected.get(0))) {
                            String msg = "These permissions are mandatory for the application. Please allow access.";
                            showMessageOKCancel(msg,
                                    new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {
                                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                                                activity.requestPermissions(permissionsRejected.toArray(
                                                        new String[permissionsRejected.size()]), ALL_PERMISSIONS_RESULT);
                                            }
                                        }
                                    });
                            return;
                        }
                    }
                } else {
                    //Toast.makeText(activity, "Permissions garanted.", Toast.LENGTH_LONG).show();
                    launchCamera();
                }
                break;
        }
    }

}
