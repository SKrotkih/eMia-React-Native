//
//  PostModel.swift
//  eMia
//

import UIKit

final class PostModel: NSObject, NSCoding {

    var ref: Any?
    var key: String?
    var id: String?
    var uid: String
    var author: String
    var title: String
    var body: String
    var created: Double
    private var photosize: String
    var starCount: Int
    
    var photoSize: (CGFloat, CGFloat) {
        get {
            if photosize.isEmpty {
                return (0.0, 0.0)
            } else {
                let arr = photosize.split(separator: ";")
                if arr.count == 2, let w = Double(arr[0]), let h = Double(arr[1]) {
                    return (CGFloat(w), CGFloat(h))
                } else {
                    return (0.0, 0.0)
                }
            }
        }
        set {
            photosize = "\(newValue.0);\(newValue.1)"
        }
    }
    
    override init() {
        self.ref = nil
        self.key = nil
        self.id = nil
        self.uid = ""
        self.author = ""
        self.title = ""
        self.body = ""
        self.created = 0
        self.photosize = ""
        self.starCount = 0
    }
    
    convenience init(coder decoder: NSCoder) {
        self.init()
        self.key = decoder.decodeObject(forKey: UserFields.key) as? String ?? ""
        self.id = decoder.decodeObject(forKey: PostItemFields.id) as? String ?? ""
        self.uid = decoder.decodeObject(forKey: PostItemFields.uid) as? String ?? ""
        self.author = decoder.decodeObject(forKey: PostItemFields.author) as? String ?? ""
        self.title = decoder.decodeObject(forKey: PostItemFields.title) as? String ?? ""
        self.body = decoder.decodeObject(forKey: PostItemFields.body) as? String ?? ""
        self.created = decoder.decodeObject(forKey: PostItemFields.created) as! TimeInterval
        self.photosize = decoder.decodeObject(forKey: PostItemFields.photosize) as? String ?? ""
        self.starCount = decoder.decodeObject(forKey: PostItemFields.starCount) as? Int ?? 0
    }
    
    func encode(with coder: NSCoder) {
        coder.encode(key, forKey: PostItemFields.key)
        coder.encode(id, forKey: PostItemFields.id)
        coder.encode(uid, forKey: PostItemFields.uid)
        coder.encode(author, forKey: PostItemFields.author)
        coder.encode(title, forKey: PostItemFields.title)
        coder.encode(body, forKey: PostItemFields.body)
        coder.encode(created, forKey: PostItemFields.created)
        coder.encode(photosize, forKey: PostItemFields.photosize)
        coder.encode(starCount, forKey: PostItemFields.starCount)
    }
    
    convenience init(uid: String, author: String, title: String, body: String, photosize: String) {
        self.init()
        self.uid = uid
        self.author = author
        self.title = title
        self.body = body
        self.photosize = photosize
        self.created = Date().timeIntervalSince1970
    }
    
    init(postItem: PostItem) {
        self.ref = postItem.ref
        self.key = postItem.key
        self.id = postItem.id
        self.uid = postItem.uid
        self.author = postItem.author
        self.title = postItem.title
        self.body = postItem.body
        self.created = postItem.created
        self.starCount = postItem.starCount
        self.photosize = postItem.photosize
    }
    
    func copy(_ rhs: PostModel) {
        self.ref = rhs.ref
        self.key = rhs.key
        self.id = rhs.id
        self.uid = rhs.uid
        self.author = rhs.author
        self.title = rhs.title
        self.body = rhs.body
        self.created = rhs.created
        self.photosize = rhs.photosize
    }
}

extension PostModel {
    
    func synchronize(completion: @escaping (String) -> Void) {
        let postItem = PostItem(uid: uid, author: author, title: title, body: body, photosize: photosize, starCount: starCount, created: created)
        postItem.setRef(ref: ref)
        postItem.id = id ?? ""
        postItem.key = key ?? ""
        postItem.synchronize() { _ in
            completion(postItem.id)
        }
    }
}

func == (lhs: PostModel, rhs: PostModel) -> Bool {
    return lhs.id == rhs.id
}

extension PostModel {
    
    func relativeTimeToCreated() -> String {
        let date = Date(timeIntervalSince1970: self.created)
        return date.relativeTime
    }
    
    func getPhoto(completion: @escaping (UIImage?) -> Void) {
        PhotosManager.downloadPhoto(for: self) { image in
            completion(image)
        }
    }
}
