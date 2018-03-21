//
//  FavoriteItem.swift
//  eMia
//

import UIKit
import Firebase
import FirebaseDatabase

// MARK: - FavoriteItem

class FavoriteItem: NSObject, NSCoding {
    
    var key: String
    var id: String
    var ref: DatabaseReference?
    
    var uid: String
    var postid: String
    
    override init() {
        self.key = ""
        self.id = ""
        self.ref = nil
        
        self.uid = ""
        self.postid = ""
    }
    
    func encode(with coder: NSCoder) {
        coder.encode(id, forKey: FavoriteItemFields.id)
        coder.encode(uid, forKey: FavoriteItemFields.uid)
        coder.encode(postid, forKey: FavoriteItemFields.postid)
    }
    
    convenience required init(coder decoder: NSCoder) {
        self.init()
        self.id = decoder.decodeObject(forKey: FavoriteItemFields.id) as? String ?? ""
        self.uid = decoder.decodeObject(forKey: FavoriteItemFields.uid) as? String ?? ""
        self.postid = decoder.decodeObject(forKey: FavoriteItemFields.postid) as? String ?? ""
    }
    
    init(uid: String, postid: String){
        self.key = ""
        self.id = ""
        self.ref = nil
        self.uid = uid
        self.postid = postid
    }
    
    init(_ snapshot: DataSnapshot) {
        key = snapshot.key
        ref = snapshot.ref
        let dict = snapshot.value as! Dictionary<String, String>
        id = dict[FavoriteItemFields.id] as String!
        uid = dict[FavoriteItemFields.uid] as String!
        postid = dict[FavoriteItemFields.postid] as String!
    }
    
    func toDictionary() -> [String : Any] {
        return [
            FavoriteItemFields.id : id,
            FavoriteItemFields.uid : uid,
            FavoriteItemFields.postid : postid
        ]
    }
    
    class func decodeSnapshot(_ snapshot: DataSnapshot) -> FavoriteItem? {
        if let _ = snapshot.value as? Dictionary<String, String> {
            let item = FavoriteItem(snapshot)
            return item
        } else {
            return nil
        }
    }
}

//MARK: - Save record

extension FavoriteItem {
    
    func synchronize(completion: @escaping (Bool) -> Void) {
        if self.key.isEmpty {
            save(completion: completion)
        } else {
            update(completion: completion)
        }
    }
    
    // Update exists data to Firebase Database
    private func update(completion: @escaping (Bool) -> Void) {
        let childUpdates = ["/\(FavoriteItemFields.favorits)/\(self.key)": self.toDictionary()]
        FireBaseManager.firebaseRef.updateChildValues(childUpdates, withCompletionBlock: { (error, ref) in
            completion(true)
        })
    }
    
    // Save new data to Firebase Database
    private func save(completion: @escaping (Bool) -> Void) {
        let key = FireBaseManager.firebaseRef.child(FavoriteItemFields.favorits).childByAutoId().key
        self.key = key
        self.id = key
        update(completion: completion)
    }
    
    func remove() {
        self.ref?.removeValue()
    }
}

//MARK: -

func == (lhs: FavoriteItem, rhs: FavoriteItem) -> Bool {
    let result = lhs.uid == rhs.uid && lhs.postid == rhs.postid
    return result
}

