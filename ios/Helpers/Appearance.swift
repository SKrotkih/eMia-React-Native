//
//  Appearance.swift
//  eMia
//

import UIKit

final class Appearance {
   private init(){}
   
   //    MARK: - Class functions
   
   static func customize() {
      
      // Color file template should be added into the project.
      UIApplication.shared.keyWindow?.tintColor  = UIColor.tint
      
      Appearance.customizeNavigationBar()
      Appearance.customizeSwithController()
      Appearance.customizeSegmentedControl()
   }
   
   static func customizeNavigationBar() {
      let navBar = UINavigationBar.appearance()
      navBar.tintColor = UIColor.navigation.tintColor
      
      // Navigation bar title
      let attr: [NSAttributedStringKey : Any] = [
         NSAttributedStringKey.foregroundColor: UIColor.white,
         NSAttributedStringKey.font: UIFont.title.navigationBar
      ]
      navBar.titleTextAttributes = attr
      
      // Background color
      navBar.isTranslucent = false
      
      navBar.setBackgroundImage(GlobalColors.kBrandNavBarImage, for: .default)
      navBar.shadowImage = UIImage(Icon.blank)
      
      // Navigation bar item
      let navBarButton = UIBarButtonItem.appearance()
      let barButtonAttr = [ NSAttributedStringKey.font: UIFont.title.barButton]
      navBarButton.setTitleTextAttributes(barButtonAttr, for: .normal)
      
   }
   
   static func customize(viewController: UIViewController) {
      if viewController.parent is UINavigationController {
         // Hides text in back barbutton item
         viewController.navigationController?.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: .plain, target: nil, action: nil)
      }
   }
   
}

//   MARK: - UISwitch

extension Appearance {
   static func customizeSwithController() {
      let appearance = UISwitch.appearance()
      appearance.tintColor = GlobalColors.kBrandNavBarColor
      appearance.onTintColor = GlobalColors.kBrandNavBarColor
   }
}

//   MARK: - Segmented control

extension Appearance {
   static func customizeSegmentedControl() {
      let appearance = UISegmentedControl.appearance()
      appearance.tintColor = GlobalColors.kBrandNavBarColor
      let attr = [
         NSAttributedStringKey.font: FontFamily.Avenir.book.font(size: 14),
         NSAttributedStringKey.foregroundColor: UIColor.black
      ]
      appearance.setTitleTextAttributes(attr, for: .normal)
   }
}
