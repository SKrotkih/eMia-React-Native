//
//  AppRouter.swift
//  eMia
//
//  Created by Sergey Krotkih on 2/7/18.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit

class AppRouter: NSObject {

   struct Storyboards {
      static let login = "Login"
      static let gallery = "Gallery"
   }
   
   let rootRouter = RootWireframe()
   let loginInteractor = LoginInteractor()
   
   func startApplication() {
      
      // TODO: remove this:
      ModelData.usersOutput = UsersManager
      
      loginInteractor.reLogIn() { success in
         if success {
            self.presentMainScreen()
         } else {
            self.presentLoginScreen()
         }
      }
   }

   func presentLoginScreen() {
      DispatchQueue.main.async {
         do {
            let _ = try self.rootRouter.initRootViewControllerWithStoryboard(Storyboards.login) as! LogInViewController
         } catch {
            assert(false, error.localizedDescription)
         }
      }
   }
   
   func presentMainScreen() {
      NotificationCenter.default.post(name: Notification.Name(Notifications.WillEnterMainScreen), object: nil)
      runAfterDelay(0.5) {
         PushNotificationsCenter.registerRemoteNotifications(for: AppDelegate.shared.application) { [weak self] in
            self?.presentGalleryScreen()
         }
      }
   }
   
   private func presentGalleryScreen() {
      DispatchQueue.main.async {
         do {
            let _ = try self.rootRouter.initRootViewControllerWithStoryboard(Storyboards.gallery) as? GalleryViewController
         } catch {
            assert(false, error.localizedDescription)
         }
      }
   }

   func createNewPost() {
   }
   
   // 3D touch on the app home screen icon handler
   func handleAction(for shortcutItem: UIApplicationShortcutItem) -> Bool {
      if shortcutItem == .createpost {
         createNewPost()
         return true
      } else if shortcutItem == .customersitelink {
         gotoCustomerSite()
         return true
      } else if shortcutItem == .aboutus {
         gotoOurSite()
         return true
      } else {
         return false
      }
   }
}
