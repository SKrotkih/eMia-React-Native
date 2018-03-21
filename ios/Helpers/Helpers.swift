//
//  Helpers.swift
//  eMia
//

import UIKit

final class Helpers {
  
  class func saveImageAsPNG(name: String) -> URL? {
    
    guard let image = UIImage(named: name) else {
      return nil
    }
    
    let imageData = UIImagePNGRepresentation(image)
    let documentsURL = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
    do {
      let imageURL = documentsURL.appendingPathComponent("\(name).png")
      _ = try imageData?.write(to: imageURL)
      return imageURL
    } catch {
      return nil
    }
  }
}

func runAfterDelay(_ delay: TimeInterval, block: @escaping ()->()) {
  let time = DispatchTime.now() + Double(Int64(delay * Double(NSEC_PER_SEC))) / Double(NSEC_PER_SEC)
  DispatchQueue.main.asyncAfter(deadline: time, execute: block)
}

func screenshotWithContentView(_ view: UIView) -> UIImage? {
   let size = view.bounds.size
   var icon: UIImage?
   
   if #available(iOS 10.0, *) {
      let renderer = UIGraphicsImageRenderer(size: size)
      let image = renderer.image { ctx in
         view.drawHierarchy(in: view.bounds, afterScreenUpdates: true)
      }
      icon = image
   } else {
      UIGraphicsBeginImageContext(size)
      //UIGraphicsBeginImageContextWithOptions(size, false, 1.0)
      view.layer.render(in: UIGraphicsGetCurrentContext()!)
      let image = UIGraphicsGetImageFromCurrentImageContext()
      UIGraphicsEndImageContext()
      icon = image
   }
   return icon
}
