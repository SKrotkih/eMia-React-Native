//
//  FireBaseStorageInteractor.swift
//  eMia
//

import UIKit
import Firebase
import FirebaseStorage
import FirebaseRemoteConfig

class FireBaseStorageInteractor: NSObject {
   
   class func saveImage(_ image: UIImage, name: String, completion: @escaping (String?) -> Void) {
      guard let imageData = UIImageJPEGRepresentation(image, 0.8) else {
         return
      }
      let metadata = StorageMetadata()
      metadata.contentType = "image/jpeg"
      let imageName = "\(name).jpg"
      Storage.storage().reference().child(imageName).putData(imageData, metadata: metadata) { (metadata, error) in
         if let error = error {
            print("Unable save data do Firebase storage: \(error.localizedDescription)")
            completion(nil)
         } else if let path = metadata?.path {
            completion(path)
         }
      }
   }
   
   class func saveSmallAvatar(for user: UserModel, image: UIImage, name: String, completion: @escaping (String?) -> Void) {
      DispatchQueue.main.async {
         let frame = CGRect(x: 0.0, y: 0.0, width: AppConstants.SizeAvatarImage, height: AppConstants.SizeAvatarImage)
         let imageView = UIImageView(frame: frame)
         imageView.contentMode = .scaleAspectFit
         imageView.image = image
         if let icon = screenshotWithContentView(imageView) {
            self.saveImage(icon, name: name) { path in
               if let path = path {
                  let imageUrl = FireBaseStorageInteractor.urlFor(path: path)
                  completion(imageUrl)
               } else {
                  completion(nil)
               }
            }
         }
      }
   }
   
   class func savePhoto(_ image: UIImage, name: String, completion: @escaping (UIImage?) -> Void) {
      let compactImage = image.transformImage()
      saveImage(compactImage, name: name) { photoUrl in
         if let _ = photoUrl {
            completion(compactImage)
         } else {
            completion(nil)
         }
      }
   }
   
   class func urlFor(path: String) -> String {
      return FireBaseManager.storageRef.child(path).description
   }
   
   class func urlFor(imageName: String) -> String {
      let url = "\(Firebase.Storage_url)/\(imageName).jpg"
      return url
   }
   
   class func downloadImage(for imageName: String, completion: @escaping (UIImage?) -> Void) {
      if imageName.isEmpty {
         completion(nil)
         return
      }
      let imageURL = "\(imageName).jpg"
      let imageRef = Storage.storage().reference().child(imageURL)
      ImageCache.default.load(forKey: imageRef) { image in
         completion(image)
      }
   }
   
   class func cleanCache(for imageName: String) {
      let imageURL = "\(imageName).jpg"
      let imageRef = Storage.storage().reference().child(imageURL)
      ImageCache.default.clean(imageRef)
   }
   
   class func removeImage(name: String, completion: @escaping (Bool) -> Void) {
      let imagePath = "\(name).jpg"
      FireBaseManager.storageRef.child(imagePath).delete() { error in
         if let error = error {
            print("Failed delete file: \(error.localizedDescription)")
            completion(false)
         }
         completion(true)
      }
   }
   
   class func removeLocalFile(_ filePath: String) {
      let fileManager = FileManager.default
      do {
         try fileManager.removeItem(atPath: filePath)
      } catch let error as NSError {
         print(error.debugDescription)
      }
   }

}
