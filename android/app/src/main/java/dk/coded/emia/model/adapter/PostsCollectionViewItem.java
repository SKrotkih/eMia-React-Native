package dk.coded.emia.model.adapter;

import android.os.Parcel;
import android.os.Parcelable;
import android.support.annotation.NonNull;

import dk.coded.emia.AsymmetricItem;
import dk.coded.emia.model.Data.Post;

public class PostsCollectionViewItem implements AsymmetricItem {
  private int columnSpan;
  private int rowSpan;
  private int position;
  public Post post;

  public PostsCollectionViewItem() {
    this(1, 1, 0);
  }

  public PostsCollectionViewItem(int columnSpan, int rowSpan, int position) {
    this.columnSpan = columnSpan;
    this.rowSpan = rowSpan;
    this.position = position;
  }

  public PostsCollectionViewItem(Parcel in) {
    readFromParcel(in);
  }

  @Override public int getColumnSpan() {
    return columnSpan;
  }

  @Override public int getRowSpan() {
    return rowSpan;
  }

  public int getPosition() {
    return position;
  }

  @Override public String toString() {
    return String.format("%s: %sx%s", position, rowSpan, columnSpan);
  }

  @Override public int describeContents() {
    return 0;
  }

  private void readFromParcel(Parcel in) {
    columnSpan = in.readInt();
    rowSpan = in.readInt();
    position = in.readInt();
  }

  @Override public void writeToParcel(@NonNull Parcel dest, int flags) {
    dest.writeInt(columnSpan);
    dest.writeInt(rowSpan);
    dest.writeInt(position);
  }

  /* Parcelable interface implementation */
  public static final Parcelable.Creator<PostsCollectionViewItem> CREATOR = new Parcelable.Creator<PostsCollectionViewItem>() {
    @Override public PostsCollectionViewItem createFromParcel(@NonNull Parcel in) {
      return new PostsCollectionViewItem(in);
    }

    @Override @NonNull public PostsCollectionViewItem[] newArray(int size) {
      return new PostsCollectionViewItem[size];
    }
  };
}
