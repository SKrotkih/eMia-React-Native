//
//  FavoritiesObserver.swift
//  eMia
//

import UIKit
import Firebase
import FirebaseDatabase

class FavoritiesObserver: NSObject {

   fileprivate var _refHandleForAdd: DatabaseHandle?
   fileprivate var _refHandleForRemove: DatabaseHandle?
   fileprivate var _refHandleForChange: DatabaseHandle?

   lazy var dbRef = FireBaseManager.firebaseRef.child(FavoriteItemFields.favorits)
   
   func addObserver() {
      
      removeObserver()
      
      // Listen for new users in the Firebase database
      _refHandleForAdd = dbRef.observe(.childAdded, with: { (snapshot) -> Void in
         if let item = FavoriteItem.decodeSnapshot(snapshot) {
            ModelData.addFavoritiesListener(item)
         }
      })
      // Listen for deleted users in the Firebase database
      _refHandleForRemove = dbRef.observe(.childRemoved, with: { (snapshot) -> Void in
         if let item = FavoriteItem.decodeSnapshot(snapshot) {
            ModelData.deleteFavoritiesListener(item)
         }
      })
      // Listen for changed users in the Firebase database
      _refHandleForChange = dbRef.observe(.childChanged, with: {(snapshot) -> Void in
         if let item = FavoriteItem.decodeSnapshot(snapshot) {
            ModelData.editFavoritiesListener(item)
         }
      })
   }
   
   func removeObserver() {
      if let _ = _refHandleForAdd, let _ = _refHandleForRemove, let _ = _refHandleForChange {
         FireBaseManager.firebaseRef.child(FavoriteItemFields.favorits).removeObserver(withHandle: _refHandleForAdd!)
         FireBaseManager.firebaseRef.child(FavoriteItemFields.favorits).removeObserver(withHandle: _refHandleForRemove!)
         FireBaseManager.firebaseRef.child(FavoriteItemFields.favorits).removeObserver(withHandle: _refHandleForChange!)
      }
   }
}
