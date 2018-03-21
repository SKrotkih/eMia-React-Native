//
//  PhotosStorageManager.swift
//  eMia
//

import UIKit
import FirebaseStorage

internal let StorageManager = PhotosStorageManager.sharedInstance

class PhotosStorageManager: NSObject {

   class var sharedInstance: PhotosStorageManager {
      struct SingletonWrapper {
         static let sharedInstance = PhotosStorageManager()
      }
      return SingletonWrapper.sharedInstance
   }
   
   fileprivate override init() {
   }
}

// MARK: - Photos Utulity

extension PhotosStorageManager {

   func downloadImage(for imageName: String, completion: @escaping (UIImage?) -> Void) {
      FireBaseStorageInteractor.downloadImage(for: imageName, completion: completion)
   }

   func removeImage(for name: String, completion: @escaping (Bool) -> Void) {
      FireBaseStorageInteractor.removeImage(name: name, completion: completion)
   }
   
   func uploadImage(_ image: UIImage, name: String, completion: @escaping (UIImage?) -> Void) {
      FireBaseStorageInteractor.savePhoto(image, name: name) { image in
         completion(image)
      }
   }
   
   func cleanCache(for name: String) {
      FireBaseStorageInteractor.cleanCache(for: name)
   }
   
}
