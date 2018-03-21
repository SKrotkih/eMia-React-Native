//
//  View.swift
//  eMia
//

import UIKit

extension UIView {
   
   func shake() {
      let animation = CAKeyframeAnimation(keyPath: "transform.translation.x")
      animation.timingFunction = CAMediaTimingFunction(name: kCAMediaTimingFunctionLinear)
      animation.duration = 0.6
      animation.values = [-20.0, 20.0, -20.0, 20.0, -10.0, 10.0, -5.0, 5.0, 0.0 ]
      layer.add(animation, forKey: "shake")
   }

   class func loadFromNibNamed(nibNamed: String, bundle : Bundle? = nil) -> UIView? {
      return UINib(nibName: nibNamed, bundle: bundle).instantiate(withOwner: nil, options: nil)[0] as? UIView
   }

   func testAnimation() {
      let animator = UIViewPropertyAnimator(duration: 1.0, curve: .easeIn){[weak self] in
         guard let `self` = self else {
            return
         }
         self.backgroundColor = UIColor(hexString: "000000")
      }
      animator.startAnimation()
   }
   
   
}
