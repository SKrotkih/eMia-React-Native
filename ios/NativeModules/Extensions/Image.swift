//
//  Image.swift
//  eMia
//

import UIKit

//    MARK: - Asset image types
protocol ImageAssetType: Testable  {}

extension UIImage {
   
   enum logo: String, ImageAssetType {
      case middle = "logo-middle"
   }
   
   enum icon: String, ImageAssetType {
      case profile = "Icon-Profile"
      case filter = "Icon-Filter"
      case marker = "icon-mapmarker"
      case blank = "Icon-Blank"
      case dot = "Icon-Dot"
      case dotSelected = "Icon-Dot-Selected"
      case star = "Icon-Star"
      case starEmpty = "Icon-Star-Empty"
      
      static let locateMe = UIImage(named: "Icon-LocateMe")!
      static let shevron = UIImage(named: "Icon-Expand")!
   }
   
   enum backgorund: String, ImageAssetType {
      case navigationBar = "Backgorund-NavigationBar"
      case buttonFacebook = "Bkg-Btn-FB"
      case splash = "spash"
   }
   
}

typealias Background = UIImage.backgorund
typealias Logo = UIImage.logo
typealias Icon = UIImage.icon

//    MARK: - Initialization

extension UIImage {

   convenience init<T>(_ imageAssetType: T) where T: ImageAssetType, T: RawRepresentable, T.RawValue == String  {
      self.init(named: imageAssetType.rawValue)!
   }
}

// MARK: - Transform Image to the appropriate size

extension UIImage {
   
   func fitToSize(_ minSize: CGFloat = 700.0) -> UIImage? {
      guard let data = UIImageJPEGRepresentation(self, 0) else {
         return nil
      }
      guard let tempImage = UIImage(data: data) else {
         return nil
      }
      let fixedOrientationImage = UIImage(cgImage: tempImage.cgImage!, scale: self.scale, orientation: self.imageOrientation)
      let image = fixedOrientationImage
      let size = image.size
      let ratio: CGFloat
      if size.width > size.height {
         ratio = size.width / minSize
      } else {
         ratio = size.height / minSize
      }
      let newSize = CGSize(width: size.width / ratio, height: size.height / ratio)
      let cgImage = image.cgImage!
      let bitsPerComponent = cgImage.bitsPerComponent
      let bytesPerRow = cgImage.bytesPerRow
      let bitmapInfo = cgImage.bitmapInfo
      if let colorSpace = cgImage.colorSpace, let context = CGContext(data: nil, width: Int(newSize.width), height: Int(newSize.height), bitsPerComponent: bitsPerComponent, bytesPerRow: bytesPerRow, space: colorSpace, bitmapInfo: bitmapInfo.rawValue) {
         context.interpolationQuality = .high
         context.draw(cgImage, in: CGRect(x: 0.0,y: 0.0, width: newSize.width, height: newSize.height))
         if let cgi = context.makeImage() {
            return UIImage(cgImage: cgi)
         }
      }
      return nil
   }
   
   func transformImage() -> UIImage {
      var resultImage = self
      if let imageData: Data = UIImageJPEGRepresentation(self, 0.6)  {
         //      if let imageData: Data = UIImagePNGRepresentation(image)  {
         if imageData.count > 500000 {
            let k: CGFloat = 500000.0 / CGFloat(imageData.count)
            let size = self.size
            let targetSize = CGSize(width: size.width * k, height: size.height * k)
            resultImage = resizeImage(targetSize: targetSize)
         }
      }
      return resultImage
   }
   
   func resizeImage(targetSize: CGSize) -> UIImage {
      let size = self.size
      
      let widthRatio  = targetSize.width  / self.size.width
      let heightRatio = targetSize.height / self.size.height
      
      // Figure out what our orientation is, and use that to form the rectangle
      var newSize: CGSize
      if(widthRatio > heightRatio) {
         newSize = CGSize(width: size.width * heightRatio, height: size.height * heightRatio)
      } else {
         newSize = CGSize(width: size.width * widthRatio,  height: size.height * widthRatio)
      }
      
      // This is the rect that we've calculated out and this is what is actually used below
      let rect = CGRect(x: 0, y: 0, width: newSize.width, height: newSize.height)
      
      // Actually do the resizing to the rect using the ImageContext stuff
      UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
      self.draw(in: rect)
      let newImage = UIGraphicsGetImageFromCurrentImageContext()
      UIGraphicsEndImageContext()
      
      return newImage!
   }
}
