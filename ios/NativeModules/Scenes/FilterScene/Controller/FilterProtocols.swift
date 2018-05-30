//
//  FilterProtocols.swift
//  eMia
//
//  Created by Сергей Кротких on 25/05/2018.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import Foundation

protocol FilterStoragable {
   func fetchFilterPreferences()
   func saveFilterPreferences()
}

protocol FilterPresented {
   func configure()
   func close()
   func addShowMeComponent(_ bacgroundView: UIView)
   func addFavoriteStatusComponent(_ bacgroundView: UIView)
   func addMunicipalityComponent(_ bacgroundView: UIView)
   func addAggesComponent(_ bacgroundView: UIView)
}

protocol PostsFiltering {
   func filterPosts(_ posts: [PostModel], searchText: String) -> [PostModel]
}
