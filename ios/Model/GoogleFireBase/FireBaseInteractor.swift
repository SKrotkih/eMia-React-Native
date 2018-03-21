//
//  FireBaseInteractor.swift
//  eMia
//

import UIKit
import Firebase
import FirebaseAuth
import FirebaseDatabase
import FirebaseStorage
import FirebaseRemoteConfig

internal let FireBaseManager = FireBaseInteractor.sharedInstance

class FireBaseInteractor: NSObject {

   fileprivate var currentFireBaseUser: User?
   fileprivate var remoteConfig: RemoteConfig!
   var displayName: String?
   fileprivate var signInCounter = 0
   
   var firebaseRef: DatabaseReference {
      return Database.database().reference().child(DataBase.name)
   }
   
   var storageRef: StorageReference {
      return Storage.storage().reference(forURL: Firebase.Storage_url)
   }

   static let sharedInstance: FireBaseInteractor = {
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      return appDelegate.fireBaseInteractor
   }()
   
   var databaseConnected: Bool {
      if let _ = currentFireBaseUser {
         return true
      } else {
         return false
      }
   }

   func signUp(email: String, password: String, completion: @escaping (String?) -> Void) {
      Auth.auth().createUser(withEmail: email, password: password) { (firebaseuser, error) in
         if let err = error {
            print(err.localizedDescription)
            self.currentFireBaseUser = nil
            completion(nil)
         } else {
            self.currentFireBaseUser = firebaseuser
            completion(self.currentFireBaseUser?.uid)
         }
      }
   }
   
   func signIn(email: String, password: String, completion: @escaping (Bool) -> Void) {
      Auth.auth().signIn(withEmail: email, password: password, completion: { (firebaseuser, error) in
         if let err = error {
            print(err.localizedDescription)
            self.currentFireBaseUser = nil
            completion(false)
         } else {
            self.currentFireBaseUser = firebaseuser
            completion(true)
         }
      })
   }
   
   func signInAnonymously(completion: @escaping (Bool) -> Void) {
      Auth.auth().signInAnonymously(completion: { (firebaseuser, error) in
         if let err = error {
            print(err.localizedDescription)
            self.currentFireBaseUser = nil
            completion(false)
            return
         }
         self.currentFireBaseUser = firebaseuser
         completion(true)
      })
   }
   
}

extension FireBaseInteractor {

   func configure() {
      FirebaseApp.configure()
      Database.database().isPersistenceEnabled = true
      configureRemoteConfig()
   }
   
   fileprivate func configureRemoteConfig() {
      remoteConfig = RemoteConfig.remoteConfig()
      // Create Remote Config Setting to enable developer mode.
      // Fetching configs from the server is normally limited to 5 requests per hour.
      // Enabling developer mode allows many more requests to be made per hour, so developers
      // can test different config values during development.
      let remoteConfigSettings = RemoteConfigSettings(developerModeEnabled: true)
      remoteConfig.configSettings = remoteConfigSettings!
   }
   
   func fetchConfig() {
      var expirationDuration: Double = 3600
      // If in developer mode cacheExpiration is set to 0 so each fetch will retrieve values from
      // the server.
      if (self.remoteConfig.configSettings.isDeveloperModeEnabled) {
         expirationDuration = 0
      }
      
      // cacheExpirationSeconds is set to cacheExpiration here, indicating that any previously
      // fetched and cached config would be considered expired because it would have been fetched
      // more than cacheExpiration seconds ago. Thus the next fetch would go to the server unless
      // throttling is in progress. The default expiration duration is 43200 (12 hours).
      remoteConfig.fetch(withExpirationDuration: expirationDuration) { (status, error) in
         if (status == .success) {
            print("Config fetched!")
            self.remoteConfig.activateFetched()
         } else {
            print("Config not fetched")
            print("Error \(String(describing: error?.localizedDescription))")
         }
      }
   }
   
}
