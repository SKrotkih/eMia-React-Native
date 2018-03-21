//
//  PostsObserver.swift
//  eMia
//

import UIKit
import Firebase
import FirebaseDatabase

class PostsObserver: NSObject {
   
   fileprivate var _refHandleForAdd: DatabaseHandle?
   fileprivate var _refHandleForRemove: DatabaseHandle?
   fileprivate var _refHandleForChange: DatabaseHandle?

   lazy var dbRef = FireBaseManager.firebaseRef.child(PostItemFields.posts)
   
   func addObserver() {
      
      removeObserver()
      
      // Listen for new posts in the Firebase database
      _refHandleForAdd = dbRef.observe(.childAdded, with: { (snapshot) -> Void in
         let item = PostItem(snapshot)
         ModelData.addPostsListener(item)
      })
      // Listen for deleted posts in the Firebase database
      _refHandleForRemove = dbRef.observe(.childRemoved, with: { (snapshot) -> Void in
         let item = PostItem(snapshot)
         ModelData.deletePostsListener(item)
      })
      // Listen for changed posts in the Firebase database
      _refHandleForChange = dbRef.observe(.childChanged, with: {(snapshot) -> Void in
         let item = PostItem(snapshot)
         ModelData.editPostsListener(item)
      })
   }
   
   func removeObserver() {
      if let _ = _refHandleForAdd, let _ = _refHandleForRemove, let _ = _refHandleForChange {
         FireBaseManager.firebaseRef.child(PostItemFields.posts).removeObserver(withHandle: _refHandleForAdd!)
         FireBaseManager.firebaseRef.child(PostItemFields.posts).removeObserver(withHandle: _refHandleForRemove!)
         FireBaseManager.firebaseRef.child(PostItemFields.posts).removeObserver(withHandle: _refHandleForChange!)
      }
   }
}
