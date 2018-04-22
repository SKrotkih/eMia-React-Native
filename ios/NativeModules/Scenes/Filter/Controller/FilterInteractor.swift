//
//  FilterInteractor.swift
//  eMia
//
//  Created by Sergey Krotkih on 2/7/18.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit

class FilterInteractor: NSObject {
   
   var presenter: FilterPresenter!

   private var filterModel: FilterModel!
   private var filterModelCopy: FilterModel!
   
   func saveChanges() {
      if filterModel == filterModelCopy {
         return
      }
      filterModel.syncronize()
   }

   func requestFilterValues() {
      if filterModel == nil {
         filterModel = FilterModel()
         filterModelCopy = FilterModel()
      }
      presenter.lookFor = filterModel!.genderFilter
      presenter.status = filterModel!.myFavoriteFilter
      presenter.minAge = filterModel!.minAge
      presenter.maxAge = filterModel!.maxAge
      presenter.municipalityId = filterModel!.municipality
   }
   
   var lookFor: Gender! {
      didSet {
         filterModel?.genderFilter = lookFor
      }
   }
   
   var status: FilterFavorite! {
      didSet {
         filterModel?.myFavoriteFilter = status
      }
   }
   
   var municipalityId: String? {
      didSet {
         filterModel?.municipality = municipalityId
      }
   }
   
   var minAge: CGFloat! {
      didSet {
         filterModel?.minAge = minAge
      }
   }
   
   var maxAge: CGFloat! {
      didSet {
         filterModel?.maxAge = maxAge
      }
   }
}
