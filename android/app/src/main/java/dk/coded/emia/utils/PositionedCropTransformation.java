package dk.coded.emia.utils;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.support.annotation.FloatRange;
import android.support.annotation.NonNull;

import com.bumptech.glide.load.Key;
import com.bumptech.glide.load.engine.bitmap_recycle.BitmapPool;
import com.bumptech.glide.load.resource.bitmap.BitmapTransformation;
import com.bumptech.glide.load.resource.bitmap.TransformationUtils;

import java.security.MessageDigest;

import static com.bumptech.glide.load.resource.bitmap.TransformationUtils.PAINT_FLAGS;

public class PositionedCropTransformation extends BitmapTransformation {
    private static final String ID = "PositionedCropTransformation.com.bumptech.glide.load.resource.bitmap.x:0.y:0";
    private static final byte[] ID_BYTES = ID.getBytes(Key.CHARSET);

    private float xPercentage = 0.5f;
    private float yPercentage = 0.5f;



    public PositionedCropTransformation(@FloatRange(from = 0.0, to = 1.0) float xPercentage, @FloatRange(from = 0.0, to = 1.0) float yPercentage) {
        this.xPercentage = xPercentage;
        this.yPercentage = yPercentage;
    }


    // Bitmap doesn't implement equals, so == and .equals are equivalent here.
    @SuppressWarnings("PMD.CompareObjectsWithEquals")
    @Override
    protected Bitmap transform(@NonNull BitmapPool pool, @NonNull Bitmap toTransform, int outWidth, int outHeight) {
        return crop(pool, toTransform, outWidth, outHeight, xPercentage, yPercentage);
    }

    /**
     * A potentially expensive operation to crop the given Bitmap so that it fills the given dimensions. This operation
     * is significantly less expensive in terms of memory if a mutable Bitmap with the given dimensions is passed in
     * as well.
     *
     * @param pool     The BitmapPool to obtain a bitmap from.
     * @param inBitmap   The Bitmap to resize.
     * @param width    The width in pixels of the final Bitmap.
     * @param height   The height in pixels of the final Bitmap.
     * @param xPercentage The horizontal percentage of the crop. 0.0f => left, 0.5f => center, 1.0f => right or anything in between 0 and 1
     * @param yPercentage The vertical percentage of the crop. 0.0f => top, 0.5f => center, 1.0f => bottom or anything in between 0 and 1
     * @return The resized Bitmap (will be recycled if recycled is not null).
     */
    private static Bitmap crop(BitmapPool pool, Bitmap inBitmap, int width, int height, float xPercentage, float yPercentage) {
        if (inBitmap.getWidth() == width && inBitmap.getHeight() == height) {
            return inBitmap;
        }

        // From ImageView/Bitmap.createScaledBitmap.
        final float scale;
        float dx = 0, dy = 0;
        Matrix m = new Matrix();
        if (inBitmap.getWidth() * height > width * inBitmap.getHeight()) {
            scale = (float) height / (float) inBitmap.getHeight();
            dx = (width - inBitmap.getWidth() * scale);
            dx *= xPercentage;
        } else {
            scale = (float) width / (float) inBitmap.getWidth();
            dy = (height - inBitmap.getHeight() * scale);
            dy *= yPercentage;
        }

        m.setScale(scale, scale);
        m.postTranslate((int) (dx + 0.5f), (int) (dy + 0.5f));

        Bitmap result = pool.get(width, height, getSafeConfig(inBitmap));
        // We don't add or remove alpha, so keep the alpha setting of the Bitmap we were given.
        TransformationUtils.setAlpha(inBitmap, result);

        applyMatrix(inBitmap, result, m);
        return result;
    }

    private static void applyMatrix(@NonNull Bitmap inBitmap, @NonNull Bitmap targetBitmap,
                                    Matrix matrix) {
        TransformationUtils.getBitmapDrawableLock().lock();
        try {
            Canvas canvas = new Canvas(targetBitmap);
            canvas.drawBitmap(inBitmap, matrix, new Paint(PAINT_FLAGS));
            canvas.setBitmap(null);
        } finally {
            TransformationUtils.getBitmapDrawableLock().unlock();
        }
    }

    private static Bitmap.Config getSafeConfig(Bitmap bitmap) {
        return bitmap.getConfig() != null ? bitmap.getConfig() : Bitmap.Config.ARGB_8888;
    }

    @Override
    public int hashCode() {
        return ID.hashCode();
    }

    @Override
    public void updateDiskCacheKey(MessageDigest messageDigest) {
        messageDigest.update(ID_BYTES);
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof PositionedCropTransformation;
    }
}