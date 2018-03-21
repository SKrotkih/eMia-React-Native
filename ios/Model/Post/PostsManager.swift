//
//  FavoritsManager.swift
//  eMia
//

import UIKit

internal let PostsManager = PostsDataBaseInteractor.sharedInstance

class PostsDataBaseInteractor: NSObject {
   
   static let sharedInstance: PostsDataBaseInteractor = {
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      return appDelegate.postsManager
   }()

   typealias UpdateListener = () -> Void
   
   fileprivate var mListener: UpdateListener?
   
   func postsListener(postNotification: @escaping () -> Void) {
      mListener = postNotification
   }
   
   func removeListener() {
      mListener = nil
   }
   
   func getData() -> [PostModel] {
      let items = ModelData.posts
      let posts = items.map { item -> PostModel in
         let post = PostModel(postItem: item)
         return post
      }
      return posts.sorted(by: {$0.created > $1.created})
   }
   
   func isItMyPost(_ post: PostModel) -> Bool {
      guard let currentUser = UsersManager.currentUser else {
         return false
      }
      return post.uid == currentUser.userId
   }
   
   func getPost(with postId: String) -> PostModel? {
      return self.getData().first(where: { $0.id == postId })
   }
   
}

extension PostsDataBaseInteractor: PostsDataBaseObservable {
   
   func addItem(_ item: PostItem) {
      didChangeData()
   }
   
   func deleteItem(_ item: PostItem) {
      didChangeData()
   }
   
   func editItem(_  item: PostItem) {
      didChangeData()
   }
}

// MARK: - Private

extension PostsDataBaseInteractor {
   
   fileprivate func didChangeData() {
      if let listener = mListener {
         listener()
      }
   }
}
