//
//  FilterDependencies.swift
//  eMia
//
//  Created by Sergey Krotkih on 2/7/18.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit

class FilterDependencies: NSObject {
   
   static func configure(view: FiltersViewController) {
      let presenter = FilterPresenter()
      let interactor = FilterInteractor()
      
      view.eventHandler = presenter
      view.presenter = presenter
      
      presenter.interactor = interactor
      presenter.view = view
      
      interactor.presenter = presenter
   }
}
