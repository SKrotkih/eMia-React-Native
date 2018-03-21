//
//  CommentModel.swift
//  eMia
//

import UIKit

final class CommentModel: NSObject, NSCoding {
   
   var ref: Any?
   var key: String?
   var id: String?
   
   var uid: String
   var author: String
   var text: String
   var postid: String
   var created: Double

   override init() {
      self.ref = nil
      self.key = nil
      self.id = nil
      
      self.uid = ""
      self.author = ""
      self.text = ""
      self.postid = ""
      self.created = 0
   }

   convenience init(coder decoder: NSCoder) {
      self.init()
      self.key = decoder.decodeObject(forKey: CommentItemFields.key) as? String ?? ""
      self.id = decoder.decodeObject(forKey: CommentItemFields.id) as? String ?? ""
      self.uid = decoder.decodeObject(forKey: CommentItemFields.uid) as? String ?? ""
      self.author = decoder.decodeObject(forKey: CommentItemFields.author) as? String ?? ""
      self.text = decoder.decodeObject(forKey: CommentItemFields.text) as? String ?? ""
      self.postid = decoder.decodeObject(forKey: CommentItemFields.postid) as? String ?? ""
      self.created = decoder.decodeObject(forKey: CommentItemFields.created) as! TimeInterval
   }
   
   func encode(with coder: NSCoder) {
      coder.encode(key, forKey: CommentItemFields.key)
      coder.encode(id, forKey: CommentItemFields.id)
      coder.encode(uid, forKey: CommentItemFields.uid)
      coder.encode(author, forKey: CommentItemFields.author)
      coder.encode(text, forKey: CommentItemFields.text)
      coder.encode(postid, forKey: CommentItemFields.postid)
      coder.encode(created, forKey: CommentItemFields.created)
   }
   
   convenience init(uid: String, author: String, text: String, postid: String) {
      self.init()
      self.uid = uid
      self.author = author
      self.text = text
      self.postid = postid
      self.created = Date().timeIntervalSince1970
   }
   
   init(postItem: CommentItem) {
      self.ref = postItem.ref
      self.key = postItem.key
      self.id = postItem.id
      
      self.uid = postItem.uid
      self.author = postItem.author
      self.text = postItem.text
      self.postid = postItem.postid
      self.created = postItem.created
   }
   
   func copy(_ rhs: CommentModel) {
      self.ref = rhs.ref
      self.key = rhs.key
      self.id = rhs.id
      
      self.uid = rhs.uid
      self.author = rhs.author
      self.text = rhs.text
      self.postid = rhs.postid
      self.created = rhs.created
   }
}

extension CommentModel {
   
   func synchronize(_ completion: @escaping (Bool) -> Void) {
      let commentItem = CommentItem(uid: uid, author: author, text: text, postid: postid, created: created)
      commentItem.setRef(ref: ref)
      commentItem.key = key ?? ""
      commentItem.id = id ?? ""
      commentItem.synchronize(completion: completion)
   }
}

func == (lhs: CommentModel, rhs: CommentModel) -> Bool {
   return lhs.id == rhs.id
}
