package dk.coded.emia.model.interactor;

/**
 * Created by oldman on 11/30/17.
 */


public class DatabaseFactory {

    static public DatabaseInteractor getDatabaseInteractor() {

        // TODO: Select Rules need
        return FirebaseInteractor.getInstance();

    }

}
