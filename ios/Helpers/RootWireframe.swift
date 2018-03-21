//
//  RootWireframe.swift
//  eMia
//

import UIKit

class RootWireframe: NSObject {

   func initRootViewControllerWithStoryboard(_ storyboardName: String) throws -> UIViewController {
      let storyboard: UIStoryboard = UIStoryboard(name: storyboardName, bundle: nil)
      if let navigationController = storyboard.instantiateInitialViewController() as? UINavigationController {
         let appDelegate = UIApplication.shared.delegate as! AppDelegate
         if let window = appDelegate.window {
            window.rootViewController = navigationController
            return navigationController.viewControllers.first!
         } else {
            throw AppRouterError.setUpRootViewController
         }
      } else {
         throw AppRouterError.storyboardGone
      }
   }
   
   func showRootViewController(_ viewController: UIViewController, inWindow: UIWindow) {
      let navigationController = navigationControllerFromWindow(inWindow)
      navigationController.viewControllers = [viewController]
   }
   
   private func navigationControllerFromWindow(_ window: UIWindow) -> UINavigationController {
      let navigationController = window.rootViewController as! UINavigationController
      return navigationController
   }
}

// MARK: - Error Exceptions

extension RootWireframe {
   
   public enum AppRouterError: Error, CustomStringConvertible
   {
      case setUpRootViewController
      case storyboardGone

      public var description : String {
         switch self {
         case .setUpRootViewController:
            return "Can not set up root view controller"
         case .storyboardGone:
            return "Requested storyboard is gone"
         }
      }
   }
}

