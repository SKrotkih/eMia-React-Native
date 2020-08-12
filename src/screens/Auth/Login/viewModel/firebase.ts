import {LoginCredentials, LoginResults, LoginViewModel} from './interface';
import {login} from '../../../../model/dbinteractor/login/dbinteractor';

export class FirebaseViewModel implements LoginViewModel {
  action(credentials: LoginCredentials): Promise<LoginResults> {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then((result) => {
          const {uid, user} = result;
          resolve({uid, user});
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
