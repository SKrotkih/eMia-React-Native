//
//  LoginDependencies.swift
//  eMia
//

import UIKit

class LoginDependencies {
   
   static func configure(viewController: LogInViewController) {
      let router = LoginRouter()
      let presenter = LoginPresenter()
      let interactor = LoginInteractor()
      
      router.rootViewController = viewController
      
      viewController.eventHandler = presenter
      viewController.presenter = presenter
      
      presenter.router = router
      presenter.interactor = interactor
      presenter.view = viewController
   }
}
