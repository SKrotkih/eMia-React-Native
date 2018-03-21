//
//  ShortcutItems.swift
//  eMia
//
//  Created by Sergey Krotkih on 1/21/18.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import Foundation

func == (lhs: UIApplicationShortcutItem,
         rhs: UIApplicationShortcutItem) -> Bool{
   return lhs.hashValue == rhs.hashValue }

extension UIApplicationShortcutItem {
   
   static var createpost: UIApplicationShortcutItem {
      return UIApplicationShortcutItem(type: "createpost", localizedTitle: "New post".localized)
   }
   
   static var customersitelink: UIApplicationShortcutItem {
      return UIApplicationShortcutItem(type: "customersitelink", localizedTitle: "Visit to the app site".localized)
   }

   static var aboutus: UIApplicationShortcutItem {
      return UIApplicationShortcutItem(type: "aboutus", localizedTitle: "About us".localized)
   }
}
