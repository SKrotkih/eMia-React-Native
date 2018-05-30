//
//  Gender.swift
//  eMia
//

import Foundation

enum Gender: Int {
   case none = -1
   case both
   case boy
   case girl
   
   var description: String? {
      switch self {
      case .none:
         return nil
      case .boy:
         return "Guy".localized
      case .girl:
         return "Girl".localized
      case .both:
         return "Both".localized
      }
   }
}

