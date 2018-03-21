package dk.coded.emia.model.adapter;

import android.widget.ListAdapter;

import dk.coded.emia.model.adapter.PostsCollectionViewItem;

import java.util.List;

public interface PostsListAdapterProtocol extends ListAdapter {

  void startListening();

  void stopListening();

  void appendItems(List<PostsCollectionViewItem> newItems);

  void setItems(List<PostsCollectionViewItem> moreItems);
}
