//
//  FilterPresenter.swift
//  eMia
//
//  Created by Сергей Кротких on 25/05/2018.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import Foundation

class FilterPresenter: FilterPresented {
   var interactor: FilterInteractor!

   // MARK: Components
   var showMeComponent: ShowMeSegmentedControl!
   var favoriteStatusComponent: FavStatusSegmentedControl!
   var municipalityComponent: MunicipalityControllerView!
   var agesComponent: AgeSliderView!

   func configure() {
      interactor.fetchFilterPreferences()
   }
   
   func close() {
      interactor.saveFilterPreferences()
   }
   
   func addShowMeComponent(_ backGroundView: UIView) {
      showMeComponent = ShowMeSegmentedControl.getInstance(for: backGroundView)
   }

   func addFavoriteStatusComponent(_ backGroundView: UIView) {
      favoriteStatusComponent = FavStatusSegmentedControl.getInstance(for: backGroundView)
   }
   
   func addMunicipalityComponent(_ backGroundView: UIView) {
      municipalityComponent = MunicipalityControllerView.getInstance(for: backGroundView)
   }

   func addAggesComponent(_ backGroundView: UIView) {
      agesComponent = AgeSliderView.getInstance(for: backGroundView, min: 0, max: 100)
   }
   
}
