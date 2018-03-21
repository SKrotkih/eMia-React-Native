//
//  AppDelegate.swift
//  eMia
//

import UIKit
import Firebase
import UserNotifications
import IQKeyboardManagerSwift

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
   var window: UIWindow?

   var shouldSupportAllOrientation = false
   
   var application: UIApplication!
   
   var fetchingManager = FetchingWorker()
   
   var fireBaseInteractor = FireBaseInteractor()
   
   var favoritsManager = FavoritsDataBaseInteractor()

   var usersDataBaseInteractor = UsersDataBaseInteractor()
   
   var reachabilityController = ReachabilityController()
   
   var avatarManager = PhotosTracker()
   
   var postsManager = PostsDataBaseInteractor()
   
   var deviceTokenController = DeviceTokenController_()
   
   var appRouter = AppRouter()
   
   static var shared: AppDelegate {
      guard let `self` = UIApplication.shared.delegate as? AppDelegate else {
         fatalError()
      }
      return self
   }
   
   var rootVC: UINavigationController {
      guard let navVC = self.window?.rootViewController as? UINavigationController else {
         fatalError()
      }
      return navVC
   }
   
   func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]?) -> Bool {
      
      self.application  = application
      
      FireBaseManager.configure()
      
      DeviceTokenController.configure()
      
      application.shortcutItems = [.createpost, .customersitelink, .aboutus]
      
      Appearance.customize()
      
      IQKeyboardManager.sharedManager().enable = true
      
      appRouter.startApplication()

      return true
   }
   
   func applicationWillEnterForeground(_ application: UIApplication) {
      NotificationCenter.default.post(name: Notification.Name(Notifications.Application.WillEnterForeground), object: nil)
   }
   
   func applicationDidBecomeActive(_ application: UIApplication) {
      NotificationCenter.default.post(name: Notification.Name(Notifications.Application.DidBecomeActive), object: nil)
   }
   
   func applicationWillResignActive(_ application: UIApplication) {
      NotificationCenter.default.post(name: Notification.Name(Notifications.Application.WillResignActive), object: nil)
   }
   
   func applicationDidEnterBackground(_ application: UIApplication) {
      NotificationCenter.default.post(name: Notification.Name(Notifications.Application.DidEnterBackground), object: nil)
   }
   
   // MARK: - Interface Orientation
   
   func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
      if (shouldSupportAllOrientation == true){
         return UIInterfaceOrientationMask.all
      }
      return UIInterfaceOrientationMask.portrait
   }
   
   // MARK: - Open URL
   
   func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
      return true
   }
   
   // MARK: - 3D touch on the app home screen icon handler
   
   func application(_ application: UIApplication, performActionFor shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
      completionHandler(appRouter.handleAction(for: shortcutItem))
   }
}

// MARK: - Push Notifications

extension AppDelegate {
   
   func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
      DeviceTokenController.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
   }
   
   func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
      DeviceTokenController.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
   }
   
   func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
      PushNotificationsCenter.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)
   }
   
   func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any]) {
      PushNotificationsCenter.application(application, didReceiveRemoteNotification: userInfo)
   }
   
   func userNotificationCenter(_ center: UNUserNotificationCenter,
                               willPresent notification: UNNotification,
                               withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
      PushNotificationsCenter.userNotificationCenter(center, willPresent: notification, withCompletionHandler: completionHandler)
   }
   
   func userNotificationCenter(_ center: UNUserNotificationCenter,
                               didReceive response: UNNotificationResponse,
                               withCompletionHandler completionHandler: @escaping () -> Void) {
      PushNotificationsCenter.userNotificationCenter(center, didReceive: response, withCompletionHandler: completionHandler)
   }
}

