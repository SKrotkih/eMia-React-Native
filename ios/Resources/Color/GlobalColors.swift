//
//  GlobalColors.swift
//  eMia
//

import UIKit

@objc class GlobalColors: NSObject {

   private static let kBrandColorName = "BrandNavBarColor"  // BrandNavBarColor2
   private static let kBrandColorHexString = "09AFED"
   
   @objc class var kBrandNavBarColor: UIColor {
      if #available(iOS 11.0, *){
         return UIColor(named: self.kBrandColorName)!
      } else {
         return UIColor(hexString: self.kBrandColorHexString)
      }
   }
   
   @objc class var kBrandNavBarImage: UIImage {
      return self.kBrandNavBarColor.imageRepresentation
   }
   
   func getRandomColor() -> UIColor {
      let randomRed:CGFloat = CGFloat(drand48())
      let randomGreen:CGFloat = CGFloat(drand48())
      let randomBlue:CGFloat = CGFloat(drand48())
      return UIColor(red: randomRed, green: randomGreen, blue: randomBlue, alpha: 1.0)
   }
}


