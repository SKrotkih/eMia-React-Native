//
//  FilterBridgeView.swift
//  eMia
//
//  Created by Сергей Кротких on 22/04/2018.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit

@objc
class FilterBridgeView: UIView {
   
   weak var viewController: UIViewController?
   
   var config: NSDictionary = [:] {
      didSet {
         setNeedsLayout()
      }
   }
   
   override init(frame: CGRect) {
      super.init(frame: frame)
   }

   required init?(coder aDecoder: NSCoder) {
      fatalError("nope")
   }
   
   override func layoutSubviews() {
      super.layoutSubviews()
      
      if viewController == nil {
         embed()
      } else {
         viewController?.view.frame = bounds
      }
   }
   
   private func embed() {
      guard let parentVC = parentViewController else {
         return
      }
      
      let storyboard = UIStoryboard(name: "Filter", bundle: nil)
      let vc = storyboard.instantiateViewController(withIdentifier: "FiltersViewController")
      
      parentVC.addChild(vc)
      addSubview(vc.view)
      vc.view.frame = bounds
      vc.didMove(toParent: parentVC)
      self.viewController = vc
   }
}

extension UIView {
   var parentViewController: UIViewController? {
      var parentResponder: UIResponder? = self
      while parentResponder != nil {
         parentResponder = parentResponder!.next
         if let viewController = parentResponder as? UIViewController {
            return viewController
         }
      }
      return nil
   }
}
