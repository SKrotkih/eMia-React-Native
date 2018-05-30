//
//  FilterAnimatedTransitioning.swift
//  eMia
//

import UIKit

class FilterAnimatedTransitioning: NSObject {
	var isPresentation : Bool = false
}

extension FilterAnimatedTransitioning: UIViewControllerAnimatedTransitioning {
	
	func transitionDuration(using transitionContext: UIViewControllerContextTransitioning?) -> TimeInterval {
		return 0.25
	}
	
	func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
		let fromVC = transitionContext.viewController(forKey: UITransitionContextViewControllerKey.from)
		let toVC = transitionContext.viewController(forKey: UITransitionContextViewControllerKey.to)
		let fromView = fromVC?.view
		let toView = toVC?.view
		let containerView = transitionContext.containerView
		
		if isPresentation {
			containerView.addSubview(toView!)
		}
		
		let animatingVC = isPresentation ? toVC : fromVC
		let animatingView = animatingVC?.view
		
		let finalFrameForVC = transitionContext.finalFrame(for: animatingVC!)
		var initialFrameForVC = finalFrameForVC
		initialFrameForVC.origin.y -= initialFrameForVC.size.height
		
		let initialFrame = isPresentation ? initialFrameForVC : finalFrameForVC
		let finalFrame = isPresentation ? finalFrameForVC : initialFrameForVC
		
		animatingView?.frame = initialFrame
		
		UIView.animate(withDuration: transitionDuration(using: transitionContext), animations: { 
			animatingView?.frame = finalFrame
		}) { finished in
			if !transitionContext.transitionWasCancelled, !self.isPresentation {
					fromView?.removeFromSuperview()
			}
			transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
		}
		
		
//		UIView.animate(withDuration: transitionDuration(using: transitionContext), delay:0, usingSpringWithDamping:1.0, initialSpringVelocity:1.0, options:UIViewAnimationOptions.allowUserInteraction, animations:{
//			animatingView?.frame = finalFrame
//		}, completion:{ (value: Bool) in
//			if !self.isPresentation {
//				fromView?.removeFromSuperview()
//			}
////			transitionContext.completeTransition(true)
//			
//			transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
//		})
		
	}

}
