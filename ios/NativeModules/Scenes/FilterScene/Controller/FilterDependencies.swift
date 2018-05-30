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
      let interactor = FilterInteractor()
      let presenter = FilterPresenter()
      presenter.interactor = interactor
      view.presenter = presenter
      interactor.presenter = presenter
   }
}
