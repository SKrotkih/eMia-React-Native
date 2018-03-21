//
//  StringExtension.swift
//  eMia
//

import Foundation

extension String {
   // There is an useful resource https://poeditor.com
   
   var localized: String {
      return NSLocalizedString(self, tableName: nil, bundle: langBundle(), value: "", comment: "")
   }
   
   func localized(_ comment: String) -> String {
      return NSLocalizedString(self, tableName: nil, bundle: langBundle(), value: "", comment: comment)
   }
   
   func langBundle() -> Bundle {
      var bundle: Bundle?
      if let currentLanguage = LanguageDefaults.sharedInstance.currentLanguage {
         if currentLanguage != "" {
            if let path = Bundle.main.path(forResource: currentLanguage, ofType: "lproj") {
               if let theBundle = Bundle(path: path) {
                  bundle = theBundle
               }
            }
         }
      }
      bundle = bundle == nil ? Bundle.main : bundle
      return bundle!
   }
}
