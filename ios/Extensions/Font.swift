//
//  Font.swift
//  eMia
//

import UIKit.UIFont

//    MARK: - Color types

typealias FontFamily = UIFont

protocol FontConvertible {
    func font(size: CGFloat) -> UIFont
    static func printNamesFromFamily() -> Void
}

extension FontConvertible where Self: RawRepresentable, Self.RawValue == String {
    func font(size: CGFloat) -> UIFont {
        return UIFont(self, size: size)
    }
    
    static func printNamesFromFamily()  {
        let fontFamily = String(describing: self)
        UIFont.printFonts(for: fontFamily)
    }
}

extension UIFont {
   enum Avenir: String, FontConvertible  {
      case book = "Avenir-Book"
      case light = "Avenir-Light"
		case heavy = "Avenir-Heavy"
		case medium = "Avenir-Medium"
   }
   
   enum LucidaGrande: String, FontConvertible {
      case regular = "LucidaGrande"
   }
   
}

//    MARK: - Initialization

extension UIFont {
   convenience init<FontType: FontConvertible> (_ font: FontType, size: CGFloat) where FontType: RawRepresentable, FontType.RawValue == String {
      self.init(name: font.rawValue, size: size)!
   }
   
   class func printFonts(for familyName: String) {
      let fontFamilyNames = UIFont.familyNames
      guard fontFamilyNames.contains(familyName) else {
         print("familyName \"\(familyName)\" not found")
         return
      }
      
      print("\(familyName):")
      let names = UIFont.fontNames(forFamilyName: familyName)
      names.forEach{ print("\t- \($0)") }
      
   }
   
   class func printAllFonts() {
              let fontFamilyNames = UIFont.familyNames
              fontFamilyNames.forEach{ UIFont.printFonts(for: $0) }
      
   }

}

//    MARK - Font scheme
extension UIFont {
   enum title {
      static var navigationBar = UIFont.Avenir.book.font(size: 17)
      static var barButton = FontFamily.LucidaGrande.regular.font(size: 14)
      
   }
}


class GlobalFonts {
   
   static let kAvenirBook = UIFont(name: "Avenir-Book", size: 17)
   static let kAvenirBold = UIFont(name: "Avenir-Heavy", size: 17)
   
}
