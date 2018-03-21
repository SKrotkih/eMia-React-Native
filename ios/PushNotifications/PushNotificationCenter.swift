//
//  PushNotificationsCenter.swift
//  eMia
//

import Foundation
import Firebase
import UserNotifications
import SwiftyJSON

internal let PushNotificationsCenter = NotificationsManager.default

protocol PushNotificationsListenable {
   func registerRemoteNotifications(for application: UIApplication, completion: @escaping () -> Void)
}

final class NotificationsManager: NSObject {
   
   static let `default` = NotificationsManager()
   
   var sender: PushNotificationsSendable!
   
   private override init() {
      super.init()
      configure()
   }
   
   private func configure() {
      let interactor = PushNotificationsInteractor()
      sender = interactor
   }
}

// MARK: - Firebase Manager Protocol

extension NotificationsManager: PushNotificationsListenable {
   
   func registerRemoteNotifications(for application: UIApplication, completion: @escaping () -> Void) {
      sender.registerRemoteNotifications(for: application) {
         UNUserNotificationCenter.current().delegate = self
         completion()
      }
   }
}

// MARK: - Users Notifications Receiver

extension NotificationsManager: UNUserNotificationCenterDelegate {
   
   func userNotificationCenter(_ center: UNUserNotificationCenter,  willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (_ options: UNNotificationPresentationOptions) -> Void) {
      
      /**
       If your app is in the foreground when a notification arrives, the notification center calls this method to deliver the notification directly to your app. If you implement this method, you can take whatever actions are necessary to process the notification and update your app. When you finish, execute the completionHandler block and specify how you want the system to alert the user, if at all.
       
       If your delegate does not implement this method, the system silences alerts as if you had passed the UNNotificationPresentationOptionNone option to the completionHandler block. If you do not provide a delegate at all for the UNUserNotificationCenter object, the system uses the notification’s original options to alert the user.
       
       see https://developer.apple.com/reference/usernotifications/unusernotificationcenterdelegate/1649518-usernotificationcenter
       
       **/
      
      UIApplication.shared.applicationIconBadgeNumber = 0
      self.handleRequestPushNotification(userInfo: notification.request.content.userInfo) {
         completionHandler([.alert, .badge, .sound])
      }
   }
   
   func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
      /**
       Use this method to perform the tasks associated with your app’s custom actions. When the user responds to a notification, the system calls this method with the results. You use this method to perform the task associated with that action, if at all. At the end of your implementation, you must call the completionHandler block to let the system know that you are done processing the notification.
       
       You specify your app’s notification types and custom actions using UNNotificationCategory and UNNotificationAction objects. You create these objects at initialization time and register them with the user notification center. Even if you register custom actions, the action in the response parameter might indicate that the user dismissed the notification without performing any of your actions.
       
       If you do not implement this method, your app never responds to custom actions.
       
       see https://developer.apple.com/reference/usernotifications/unusernotificationcenterdelegate/1649501-usernotificationcenter
       
       **/
      let notification = response.notification
      self.handleRequestPushNotification(userInfo: notification.request.content.userInfo) {
         completionHandler()
      }
   }
   
   func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
      runAfterDelay(3.0) {
         self.handleRequestPushNotification(userInfo: userInfo) {
            completionHandler(.newData)
         }
      }
   }
   
   // If you are receiving a notification message while your app is in the background,
   // this callback will not be fired till the user taps on the notification launching the application.
   func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any]) {
      runAfterDelay(3.0) {
         self.handleRequestPushNotification(userInfo: userInfo) {  }
      }
   }
}

// MARK: -

extension NotificationsManager {
   
   fileprivate func handleRequestPushNotification(userInfo: [AnyHashable: Any], completion: @escaping () -> Void) {
      
      completion()
   }
}

// MARK: - Push Notifications Sender

extension NotificationsManager {
   
   func send(_ type: PushNotification, completion: (() -> Void)?) {
      sender.send(type, completion: completion)
   }
}

