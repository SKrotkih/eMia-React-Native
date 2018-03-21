package dk.coded.emia.model.observer;

import java.util.List;
import dk.coded.emia.model.Data.User;

/**
 * Created by oldman on 12/10/17.
 */

public interface UserObserverProtocol {

    void updateUsers(List<User> users);
    void newUser(User user);

}
