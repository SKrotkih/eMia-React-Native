//
//  DeviceTokenController.swift
//  eMia
//
import Foundation
import Firebase
import FirebaseMessaging

internal let DeviceTokenController = DeviceTokenController_.sharedInstance

class DeviceTokenController_: NSObject {
    
    internal var observers = [Any] ()
    
    static let sharedInstance: DeviceTokenController_ = {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        return appDelegate.deviceTokenController
    }()
    
    
    /// Device token, if Firebase is used then we store `fcmToken`
    fileprivate var deviceToken: String? {
        return  Messaging.messaging().fcmToken
    }
    
    func configure() {
        Messaging.messaging().delegate = self
        registerObservers()
    }
    
    fileprivate func registerObservers() {
        let queue = OperationQueue.main
        observers.append(
            NotificationCenter.default.addObserver(forName: Notification.Name(Notifications.ChangeData.CurrentUser), object: nil, queue: queue) { notification in
                self.updateDeviceToken()
            }
        )
    }
    
    fileprivate func unregisterObservers() {
        observers.forEach {
            NotificationCenter.default.removeObserver($0)
        }
        observers.removeAll()
    }
    
    fileprivate func updateDeviceToken() {
        self.add(token: self.deviceToken)
    }
    
    /// Add device token for current user
    ///
    /// - Parameter token: new token
    private func add(token: String?) {
        guard let token = token, !token.isEmpty else {
            return
        }
        guard let currentUser = UsersManager.currentUser else {
            return
        }
        self.userDefaultDeviceTokenUpdate(for: token)
        self.iOSTokens(for: currentUser) { tokens in
            if let _ = tokens.index(of: token) {
                return
            }
            var tokens = tokens
            tokens.append(token)
            self.synchronize(tokens, for: currentUser) { _ in }
        }
    }
    
    private func synchronize(_ tokens: [String], for user: UserModel, completion: @escaping (Bool) -> Void) {
        let tokensIOSValues = tokens.joined(separator: Settings.separator)
        user.tokenIOS = tokensIOSValues
        user.synchronize() { success in
            completion(success)
        }
    }
    
    private func userDefaultDeviceTokenUpdate(for decviceToken: String) {
        var tokens = myDeviceTokens
        if let _ = tokens.index(of: decviceToken) {
            return
        }
        tokens.append(decviceToken)
        let data = NSKeyedArchiver.archivedData(withRootObject: tokens)
        UserDefaults.standard.set(data, forKey: UserDefaultsKey.kDeviceTokens)
        UserDefaults.standard.synchronize()
    }
    
    var myDeviceTokens: [String] {
        if let data = UserDefaults.standard.object(forKey: UserDefaultsKey.kDeviceTokens) as? Data {
            if let myDeviceTokens = NSKeyedUnarchiver.unarchiveObject(with: data) as? [String] {
                return myDeviceTokens
            }
        }
        return []
    }
    
    func removeDeviceTokens(for user: UserModel, completion: @escaping (String) -> Void) {
        let myTokens = self.myDeviceTokens
        self.iOSTokens(for: user) { currentTokens in
            var currentTokens = currentTokens
            for token in myTokens {
                if let index = currentTokens.index(of: token) {
                    currentTokens.remove(at: index)
                }
            }
            let tokensIOSValues = currentTokens.joined(separator: Settings.separator)
            completion(tokensIOSValues)
        }
    }
}

// MARK: - Messaging Delegate

extension DeviceTokenController_: MessagingDelegate {
    
    func messaging(_ messaging: Messaging, didRefreshRegistrationToken fcmToken: String) {
        print(#function)
        updateDeviceToken()
    }
}

// MARK: - AppDelegate protocol

extension DeviceTokenController_ {
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        DispatchQueue.main.async {
            Messaging.messaging().apnsToken = deviceToken
            self.updateDeviceToken()
        }
        output(deviceToken: deviceToken)
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("\(#function) Registration failed!")
    }
    
    private func output(deviceToken: Data) {
        var token = ""
        for i in 0..<deviceToken.count {
            token = token + String(format: "%02.2hhx", arguments: [deviceToken[i]])
        }
        print("Registration succeeded! Token: ", token)
        let fcmToken = Messaging.messaging().fcmToken
        print("fcmToken", fcmToken ?? "NaN" )
    }
}

// MARK: - Current DEvice Tokens

extension DeviceTokenController_ {
    
    func iOSTokens(for user: UserModel, _ completion: @escaping ([String]) -> Void) {
        userDeviceTokens(for: user, fieldName: UserFields.tokenIOS, completion: completion)
    }
    
    /// List of user device tokens
    func androidTokens(for user: UserModel, _ completion: @escaping ([String]) -> Void) {
        userDeviceTokens(for: user, fieldName: UserFields.tokenAndroid, completion: completion)
    }
    
    private func userDeviceTokens(for user: UserModel, fieldName: String, completion: @escaping ([String]) -> Void) {
        FireBaseManager.firebaseRef.child(UserFields.users).child(user.userId).child(fieldName).observeSingleEvent(of: .value, with: { snapshot in
            if snapshot.exists() {
                if let tokens = snapshot.value as? String {
                    var newDeviceTokens = [String]()
                    let deviceTokens = tokens.components(separatedBy: Settings.separator)
                    for token in deviceTokens {
                        if token.count > 10 {
                            newDeviceTokens.append(token)
                        }
                    }
                    completion(newDeviceTokens)
                } else {
                    completion([])
                }
            } else {
                completion([])
            }
        })
    }
}

