//
//  LanguageDefaults.swift
//  eMia
//

import Foundation

class LanguageDefaults: NSObject {
   
   static let kCurrentLanguageKey = "CurrentLanguageKey"
   
   fileprivate var _currentLanguage: String?
   
   class var sharedInstance: LanguageDefaults {
      struct SingletonWrapper {
         static let sharedInstance = LanguageDefaults()
      }
      return SingletonWrapper.sharedInstance;
   }
   
   fileprivate override init() {
      let userDefaults = UserDefaults.standard
      if let currentLanguage = userDefaults.string(forKey: LanguageDefaults.kCurrentLanguageKey){
         _currentLanguage = currentLanguage
      } else {
         _currentLanguage = Locale.preferredLanguages[0]
         userDefaults.set(_currentLanguage, forKey: LanguageDefaults.kCurrentLanguageKey)
      }
      
      super.init()
   }
   
   var currentLanguage: String? {
      get {
         return _currentLanguage
      }
      set (language) {
         if language == _currentLanguage {
            _currentLanguage = ""
         } else {
            _currentLanguage = language
         }
         let userDefaults = UserDefaults.standard
         userDefaults.set(_currentLanguage, forKey: LanguageDefaults.kCurrentLanguageKey)
      }
   }
   
}
