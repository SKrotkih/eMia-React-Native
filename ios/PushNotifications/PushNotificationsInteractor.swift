//
//  PushNotificationsInteractor.swift
//  eMia
//

import UIKit
import Firebase
import UserNotifications
import SwiftyJSON

protocol PushNotificationsSendable {
   func send(_ type: PushNotification, completion: (() -> Void)?)
   func registerRemoteNotifications(for application: UIApplication, completion: @escaping () -> Void)   
}

class PushNotificationsInteractor: NSObject {
   fileprivate let _sendmessageGroup = DispatchGroup()
}

// MARK: - Push Notifications Sender

extension PushNotificationsInteractor: PushNotificationsSendable {
   
   func registerRemoteNotifications(for application: UIApplication, completion: @escaping () -> Void) {
      if Platform.isSimulator {
         completion()
      } else {
         let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
         UNUserNotificationCenter.current().requestAuthorization(options: authOptions) { (success, error) in
            DispatchQueue.main.async {
               application.registerForRemoteNotifications()
               completion()
            }
         }
      }
   }
   
   func send(_ type: PushNotification, completion: (() -> Void)?) {
      let url = URL(string: Firebase.PushNotificationUrl)!
      var request = URLRequest(url: url)
      request.httpMethod = "POST"
      request.setValue("application/json", forHTTPHeaderField: "Content-Type")
      request.setValue("key=\(Firebase.ServerKey)", forHTTPHeaderField: "Authorization")
      
      type.notifications() { data in
         for jsonData in data {
            
            request.httpBody = jsonData
            self._sendmessageGroup.enter()
            let task = URLSession.shared.dataTask(with: request) { data, response, error in
               
               guard let _ = data, let response = response, error == nil else {
                  print("Error=\(error!.localizedDescription)")
                  return
               }
               if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                  // check for http errors
                  print("Status Code should be 200, but is \(httpStatus.statusCode)")
                  print("Response = \(response)")
               }
               self._sendmessageGroup.leave()
            }
            task.resume()
         }
         
         self._sendmessageGroup.notify(queue: DispatchQueue.main) {
            completion?()
         }
      }
   }
}
