//
//  FilterModel.swift
//  eMia
//
//  Created by Sergey Krotkih on 12/28/17.
//  Copyright © 2017 Coded I/S. All rights reserved.
//

import UIKit

struct FilterModel: Equatable {
   
   private var manager = FilterManager()
   
   var myFavoriteFilter: FilterFavorite
   var genderFilter: Gender
   var minAge: CGFloat
   var maxAge: CGFloat
   var municipality: String?

   init() {
      myFavoriteFilter = manager.myFavoriteFilter
      genderFilter = manager.genderFilter
      minAge = manager.minAge
      maxAge = manager.maxAge
      municipality = manager.municipality
   }
   
   func syncronize() {
      manager.myFavoriteFilter = myFavoriteFilter
      manager.genderFilter = genderFilter
      manager.minAge = minAge
      manager.maxAge = maxAge
      manager.municipality = municipality
   }
}

func == (leftSide: FilterModel, rightSide: FilterModel) -> Bool {
   let cmp1 = leftSide.myFavoriteFilter == rightSide.myFavoriteFilter
   let cmp2 = leftSide.genderFilter == rightSide.genderFilter
   let cmp3 = leftSide.minAge == rightSide.minAge
   let cmp4 = leftSide.maxAge == rightSide.maxAge
   let mun1 = leftSide.municipality ?? ""
   let mun2 = rightSide.municipality ?? ""
   let cmp5 = mun1 == mun2
   return cmp1 && cmp2 && cmp3 && cmp4 && cmp5
}
