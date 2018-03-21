//
//  LoginInteractor.swift
//  eMia
//

import UIKit

class LoginInteractor: NSObject {

   func reLogIn(_ completion: @escaping (Bool) -> Void) {
      let initUserEmail = UserDefaults.standard.value(forKey: UserDefaultsKey.initUserEmailKey) as? String
      let initUserPassword = UserDefaults.standard.value(forKey: UserDefaultsKey.initUserPasswordKey) as? String
      if initUserEmail == nil || initUserPassword == nil {
         completion(false)
      } else {
         self.signIn(email: initUserEmail!, password: initUserPassword!, completion: completion)
      }
   }
   
   func signUp(user: UserModel, password: String, completion: @escaping (UserModel?) -> Void) {
      let email = user.email
      FireBaseManager.signUp(email: email, password: password) { userId in
         guard let userId = userId else {
            Alert.default.showOk("Server error".localized, message: "Can't register a new user!".localized)
            completion(nil)
            return
         }
         user.userId = userId
         UserDefaults.standard.set(email, forKey: UserDefaultsKey.initUserEmailKey)
         UserDefaults.standard.set(password, forKey: UserDefaultsKey.initUserPasswordKey)
         self.alreadyRegistreredUser(email: email) { registeredUser in
            if let registeredUser = registeredUser {
               UsersManager.currentUser = registeredUser
               completion(registeredUser)
            } else {
               UsersManager.registerUser(user) { newUser in
                  if let newUser = newUser {
                     UsersManager.currentUser = newUser
                     completion(newUser)
                  } else {
                     Alert.default.showOk("Server error".localized, message: "Can't register a new user!".localized)
                     completion(nil)
                  }
               }
            }
         }
      }
   }
   
   func signIn(email: String, password: String, completion: @escaping (Bool) -> Void) {
      FireBaseManager.signIn(email: email, password: password) { success in
         if success {
            UserDefaults.standard.set(email, forKey: UserDefaultsKey.initUserEmailKey)
            UserDefaults.standard.set(password, forKey: UserDefaultsKey.initUserPasswordKey)
            self.alreadyRegistreredUser(email: email) { user in
               if let user = user {
                  UsersManager.currentUser = user
                  completion(true)
               } else {
                  completion(false)
               }
            }
         } else {
            completion(false)
         }
      }
   }
   
   private func alreadyRegistreredUser(email: String, completion: @escaping (UserModel?) -> Void) {
      ModelData.fetchData() {
         UsersManager.getAllUsers() { userItems in
            if let index = userItems.index(where: {$0.email.lowercased() == email.lowercased()}) {
               completion(userItems[index])
            } else {
               completion(nil)
            }
         }
      }
   }
}
