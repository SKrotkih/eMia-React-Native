//
//  CommentsManager.swift
//  eMia
//

import UIKit

protocol CommentsListening {
   func addCommentsListener(_ item: CommentItem)
   func deleteCommentsListener(_ item: CommentItem)
   func editCommentsListener(_  item: CommentItem)
}

class CommentsManager: NSObject {

   fileprivate var _comments = [CommentItem]()
   fileprivate var commnetsObserver = CommentsObserver()
   fileprivate var _delegate: CommentsUpdatable!
   
   override init() {
      super.init()
   }
   
   var comments: [CommentModel] {
      var comments = [CommentModel]()
      for item in _comments {
         let commentModel = CommentModel(postItem: item)
         comments.append(commentModel)
      }
      return comments.sorted(by: {$0.created > $1.created})
   }
   
   func startCommentsObserver(for post: PostModel, delegate: CommentsUpdatable) {
      _delegate = delegate
      ModelData.fetchAllComments(nil, for: post, addComment: { commentItem in
         self.addCommentsListener(commentItem)
      }, completion: {
         self.commnetsObserver.addObserver(for: post, delegate: self)
         self._delegate = delegate
      })
   }
}

extension CommentsManager: CommentsListening {
   
   func addCommentsListener(_ item: CommentItem) {
      if let _ = index(of: item) {
      } else {
         _comments.append(item)
         self._delegate.didUpdateCommentsData()
      }
   }
   
   func deleteCommentsListener(_ item: CommentItem) {
      if let index = index(of: item) {
         _comments.remove(at: index)
         self._delegate.didUpdateCommentsData()
      }
   }
   
   func editCommentsListener(_  item: CommentItem) {
      if let index = index(of: item) {
         _comments[index] = item
         self._delegate.didUpdateCommentsData()
      }
   }
   
   fileprivate func index(of item: CommentItem) -> Int? {
      var index = 0
      for comment in _comments {
         if comment == item {
            return index
         }
         index += 1
      }
      return nil
   }
}
