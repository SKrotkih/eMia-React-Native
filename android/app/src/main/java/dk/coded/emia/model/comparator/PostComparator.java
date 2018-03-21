package dk.coded.emia.model.comparator;

import java.util.Comparator;

import dk.coded.emia.model.adapter.PostsCollectionViewItem;

/**
 * Created by oldman on 12/10/17.
 */

public final class PostComparator implements Comparator<PostsCollectionViewItem> {

    public int compare(PostsCollectionViewItem left, PostsCollectionViewItem right) {
        long created1 = left.post.created;
        long created2 = right.post.created;
        if (created1 < created2) {
            return 1;
        } else {
            return -1;
        }
    }

}
