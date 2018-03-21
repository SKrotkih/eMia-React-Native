//
//  UserItem.swift
//  eMia
//

import UIKit
import Firebase
import FirebaseDatabase

class UserItem: NSObject {
   
   // Users
   var key: String
   var userId: String
   var ref: DatabaseReference?
   
   let username: String
   let email: String
   let address: String
   let gender: Int
   let yearbirth: Int
   let tokenIOS: String
   let tokenAndroid: String
   
   init(user: UserModel) {
      self.key = user.key
      self.userId = user.userId
      self.ref = user.ref as? DatabaseReference

      self.username = user.name
      self.email = user.email
      self.address = user.address ?? ""
      self.gender = user.gender?.rawValue ?? 0
      self.yearbirth = user.yearbirth ?? 0
      self.tokenIOS = user.tokenIOS ?? ""
      self.tokenAndroid = user.tokenAndroid ?? ""
   }
   
   init(_ snapshot: DataSnapshot) {
      key = snapshot.key
      ref = snapshot.ref

      let snapshotValue = snapshot.value as! [String: AnyObject]
      userId = snapshotValue[UserFields.userId] as! String
      username = snapshotValue[UserFields.name] as! String
      email = snapshotValue[UserFields.email] as! String
      address = snapshotValue[UserFields.address] as? String ?? ""
      gender = snapshotValue[UserFields.gender] as? Int ?? 0
      if let stringYear = snapshotValue[UserFields.yearbirth] as? String {
         yearbirth = Int(stringYear)!
      } else {
         yearbirth = snapshotValue[UserFields.yearbirth] as? Int ?? 0
      }
      tokenIOS = snapshotValue[UserFields.tokenIOS] as? String ?? ""
      tokenAndroid = snapshotValue[UserFields.tokenAndroid] as? String ?? ""
   }
   
   func toDictionary() -> [String : Any] {
      return [
         UserFields.userId: userId,
         UserFields.name: username,
         UserFields.email: email,
         UserFields.address: address,
         UserFields.gender: gender,
         UserFields.yearbirth: yearbirth,
         UserFields.tokenIOS: tokenIOS,
         UserFields.tokenAndroid: tokenAndroid
      ]
   }
}

func == (lhs: UserItem, rhs: UserItem) -> Bool {
   return lhs.userId == rhs.userId && lhs.email.lowercased() == rhs.email.lowercased()
}

// MARK: - Update data on server

extension UserItem {

   func synchronize(completion: @escaping (Bool) -> Void) {
      update(completion: completion)
   }
   
   // Update exists data to Firebase Database
   private func update(completion: @escaping (Bool) -> Void) {
      let childUpdates = ["/\(UserFields.users)/\(self.userId)": self.toDictionary()]
      FireBaseManager.firebaseRef.updateChildValues(childUpdates, withCompletionBlock: { (error, ref) in
         if let error = error {
            print("Error while synchronize user item: \(error.localizedDescription)")
            completion(false)
         } else {
            completion(true)
         }
      })
   }
   
   func remove() {
      self.ref?.removeValue()
   }
}

