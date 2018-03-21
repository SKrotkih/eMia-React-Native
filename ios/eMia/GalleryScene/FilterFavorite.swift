//
//  FilterFavorite.swift
//  eMia
//

import Foundation

enum FilterFavorite: Int16 {
	case none = -1
	case all
	case myFavorite
	
	var description: String? {
		switch self {
		case .none:
         return nil
		case .all:
         return "All".localized
		case .myFavorite:
         return "My Favorite".localized
		}
	}
}
