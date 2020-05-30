import {signIn, signOut, resetPassword, fetchUserData} from '@model/firebase/auth/api';
import {LOGGED_IN} from '@model/actions/login/actionTypes';

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        signIn(data)
            .then((uid) => {
                console.log('LOGIN SUCCESS. User UID=', uid);
                fetchUserData(uid)
                    .then((currentUser) => {
                        dispatch({type: LOGGED_IN, data: currentUser});
                        successCB(uid, currentUser);
                    })
                    .catch((error) => {
                        console.log(error);
                        successCB(uid, null);
                    });
            })
            .catch((error) => {
                console.log('LOGIN ERROR: ', error);
                errorCB(error);
            });
    }
}

export function logOut(successCB, errorCB) {
    signOut(function (success, data, error) {
        if (success) {
            successCB();
        } else if (error) {
            errorCB(error);
        }
    });
}

export function forgetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        resetPassword(data, function (success, _data, error) {
            if (success) {
                successCB();
            } else if (error) {
                errorCB(error);
            }
        });
    };
}
