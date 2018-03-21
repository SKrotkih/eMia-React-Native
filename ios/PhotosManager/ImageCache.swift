//
//  ImageCache.swift
//  eMia
//

import UIKit
import AwesomeCache
import Firebase
import FirebaseStorage

class ImageCache {
    
    static let `default` = ImageCache()
    
    let kMaxImageSize: Int64 = 1 * 1024 * 1024
    
    typealias DownloadIdentifier = StringIdentifier
	
	static var budleID: String {
		return  "\(Bundle.main.bundleIdentifier!).\(String(describing: ImageCache.self))"
	}
	fileprivate let concurrentPhotoQueue = DispatchQueue(label: ImageCache.budleID, attributes: .concurrent)

    fileprivate let cache = try! Cache<UIImage>(name: "ImageCache")
    
    private init() {
	}
}

protocol ImagesCacheble {
}

extension ImageCache: ImagesCacheble {
    
    func set(_ image: UIImage?, forKey storageRef: StorageReference) {
        concurrentPhotoQueue.async(flags: .barrier) {
            if let image = image {
                self.cache[storageRef.fullPath] = image
            } else {
                self.cache[storageRef.fullPath] = nil
            }
        }
    }

   func clean(_ storageRef: StorageReference) {
      concurrentPhotoQueue.async(flags: .barrier) {
         self.cache[storageRef.fullPath] = nil
      }
   }
   
	@discardableResult
	func load(forKey storageRef: StorageReference, completion: @escaping (_ image: UIImage?) -> Void) -> StorageDownloadTask? {
        if let cachedImage = cache[storageRef.fullPath] {
			completion(cachedImage)
			return nil
		} else if Network.reachable {
			return storageRef.getData(maxSize: self.kMaxImageSize) { (data, error) -> Void in
				guard error == nil else {
					print("Cannot load image: ", error!.localizedDescription)
					completion(nil)
					return
				}
				let image: UIImage! = UIImage(data: data!)
                self.set(image, forKey: storageRef)
                completion(image)
			}
        } else {
            completion(nil)
            return nil
        }
	}

    @discardableResult
    func load(forKey storageRef: StorageReference, downloadID: DownloadIdentifier?, completion: @escaping (_ image: UIImage?, _ downloadID: DownloadIdentifier? ) -> Void) -> StorageDownloadTask? {
        if let cachedImage = cache[storageRef.fullPath] {
            completion(cachedImage, downloadID)
            return nil
        } else if Network.reachable {
            return storageRef.getData(maxSize: self.kMaxImageSize) { (data, error) -> Void in
            				guard error == nil else {
                                print("Cannot load image: ", error!.localizedDescription)
                                completion(nil, downloadID)
                                return
            				}
                let image: UIImage! = UIImage(data: data!)
                self.set(image, forKey: storageRef)
                completion(image, downloadID)
            }
        } else {
            completion(nil, downloadID)
            return nil
        }
    }
}

extension StorageReference {
	var cacheKey: NSString { return self.fullPath as NSString }
}
