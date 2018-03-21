//
//  PhotosManager.swift
//  eMia
//

import UIKit
import Firebase

internal let PhotosManager = PhotosTracker.sharedInstance

class PhotosTracker: NSObject {
   
   fileprivate var fetchingDataInProgress = true
   
   fileprivate var stopDownloading: Bool!
   
   static let sharedInstance: PhotosTracker = {
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      return appDelegate.avatarManager
   }()
   
   override init() {
      super.init()
      subscribeOnNotifications()
   }
   
   deinit {
   }
   
   fileprivate func subscribeOnNotifications() {
      NotificationCenter.default.addObserver(self, selector: #selector(willEnterToMainScreen), name: Notification.Name(Notifications.WillEnterMainScreen), object: nil)
   }
   
   @objc func willEnterToMainScreen(_ notification: NSNotification) {
   }
   
   func smallAvatarName(_ user: UserModel) -> String {
      return "\(user.userId)"
   }
   
   public func removeAvatar(user: UserModel, completion: (Bool) -> Void) {
   }
   
   func cleanPhotoCache(for user: UserModel) {
      let avatarFileName = user.userId
      StorageManager.cleanCache(for: avatarFileName)
   }
   
}

extension PhotosTracker {

   func downloadPhoto(for post: PostModel, completion: @escaping (UIImage?) -> Void) {
      guard let photoName = post.id else {
         completion(nil)
         return
      }
      StorageManager.downloadImage(for: photoName) { image in
         completion(image)
      }
   }

   func downloadAvatar(for userId: String, completion: @escaping (UIImage?) -> Void) {
      StorageManager.downloadImage(for: userId) { image in
         completion(image)
      }
   }
   
   func uploadPhoto(_ image: UIImage, for name: String, completion: @escaping (Bool) -> Void) {
      StorageManager.uploadImage(image, name: name) { image in
         completion(image != nil)
      }
   }
}
