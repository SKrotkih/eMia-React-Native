//
//  LoginPresenter.swift
//  eMia
//

import UIKit

class LoginPresenter: NSObject {

   var router: LoginRouter!
   var interactor: LoginInteractor!
   var view: LogInViewController!
   
   func startProgress() {
      view.startProgress()
   }
   
   func stopProgress() {
      view.stopProgress()
   }

   func prepare(for segue: UIStoryboardSegue, sender: Any?) {
      router.prepare(for: segue, sender: sender)
   }
   
   func signIn(_ email: String?, _ password: String?, completion: @escaping (LoginPresenter.LoginError?) -> Void) {
      guard let email = email, email.isValidEmail() else {
         completion(.emailIsWrong)
         return
      }
      guard let password = password, password.count > 6 else {
         completion(.passwordIsWrong)
         return
      }
      startProgress()
      interactor.signIn(email: email, password: password) { success in
         self.stopProgress()
         if success {
            presentMainScreen()
         } else {
            completion(.accessDenied)
         }
      }
   }
   
   func signUp(_ email: String?, _ password: String?, completion: (LoginPresenter.LoginError?) -> Void) {
      guard let email = email, email.isValidEmail() else {
         completion(.emailIsAbsent)
         return
      }
      guard let password = password, password.count > 6 else {
         completion(.passwordIsWrong)
         return
      }
      let name = email.components(separatedBy: "@").first!
      let user = UserModel(name: name, email: email, address: nil, gender: nil, yearbirth: nil)
      router.performEditProfile(password, user)
   }
}

// MARK: - Error

extension LoginPresenter {
   
   public enum LoginError: Error, CustomStringConvertible
   {
      case emailIsAbsent
      case emailIsWrong
      case passwordIsWrong
      case accessDenied
      
      public var description : String {
         switch self {
         case .emailIsAbsent:
            return "Please enter your email address".localized
         case .emailIsWrong:
            return "Email is wrong".localized
         case .passwordIsWrong:
            return "Please enter password (more than 6 characters)".localized
         case .accessDenied:
            return "Access denied. Please check password an try again".localized
         }
      }
   }
}
