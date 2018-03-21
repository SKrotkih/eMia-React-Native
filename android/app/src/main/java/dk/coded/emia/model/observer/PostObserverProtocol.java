package dk.coded.emia.model.observer;

import java.util.List;
import dk.coded.emia.model.Data.Post;

/**
 * Created by oldman on 12/10/17.
 */

public interface PostObserverProtocol {

    void update(List<Post> posts);
    void newPost(Post post);

}
