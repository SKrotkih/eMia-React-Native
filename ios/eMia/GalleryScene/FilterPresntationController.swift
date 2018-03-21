//
//  FilterPresntationController.swift
//  eMia
//

import UIKit

class FilterPresntationController: UIPresentationController {
	
	var dimmingView: UIView! = UIView()
	var interactor = InteractorTransition()
	
	
	override init(presentedViewController: UIViewController, presenting presentingViewController: UIViewController?) {
		super.init(presentedViewController: presentedViewController, presenting: presentingViewController)
		dimmingView.backgroundColor = UIColor(white:0.0, alpha:0.4)
		dimmingView.alpha = 0.0
	}
	
	override var frameOfPresentedViewInContainerView : CGRect {
		var presentedViewFrame = CGRect.zero
		let containerBounds = containerView!.bounds
		presentedViewFrame.size = size(forChildContentContainer: presentedViewController, withParentContainerSize: containerBounds.size)
		presentedViewFrame.origin.x = containerBounds.size.width - presentedViewFrame.size.width
		return presentedViewFrame
	}
	
	override func size(forChildContentContainer container: UIContentContainer, withParentContainerSize parentSize: CGSize) -> CGSize {
		return CGSize(width: parentSize.width, height: container.preferredContentSize.height)
	}
	
	override func presentationTransitionWillBegin() {
		
		// Setup diminig view
		dimmingView.frame = (self.containerView?.bounds)!
		dimmingView.alpha = 0.0
		dimmingView.isOpaque = false
		containerView?.insertSubview(dimmingView, at:0)
		
		// Tap handler
		let tap = UITapGestureRecognizer(target: self, action: #selector(handleTapGesture(_:)))
		dimmingView.addGestureRecognizer(tap)
		
		dimmingView.addGestureRecognizer(UIPanGestureRecognizer(target: self, action: #selector(handlePanGesture(_:))))
		presentedViewController.view.addGestureRecognizer(UIPanGestureRecognizer(target: self, action: #selector(handlePanGesture(_:))))
		
		
		let coordinator = presentedViewController.transitionCoordinator
		if (coordinator != nil) {
			coordinator!.animate(alongsideTransition: {
				(context:UIViewControllerTransitionCoordinatorContext!) -> Void in
				self.dimmingView.alpha = 1.0
			}, completion:nil)
		} else {
			dimmingView.alpha = 1.0
		}
	}
	
	override func presentationTransitionDidEnd(_ completed: Bool) {
		// The value of the 'completed' argument is the same value passed to the
		// -completeTransition: method by the animator.  It may
		// be NO in the case of a cancelled interactive transition.
		if completed == false {
			// The system removes the presented view controller's view from its
			// superview and disposes of the containerView.  This implicitly
			// removes the views created in -presentationTransitionWillBegin: from
			// the view hierarchy.  However, we still need to relinquish our strong
			// references to those view.
			self.dimmingView = nil
		}
	}
	
	override func dismissalTransitionWillBegin() {
		let coordinator = presentedViewController.transitionCoordinator
		if (coordinator != nil) {
			coordinator!.animate(alongsideTransition: { (context:UIViewControllerTransitionCoordinatorContext!) -> Void in
				self.dimmingView.alpha = 0.0
			}, completion:nil)
		} else {
			dimmingView.alpha = 0.0
		}
	}
	
	override func dismissalTransitionDidEnd(_ completed: Bool) {
		// The value of the 'completed' argument is the same value passed to the
		// -completeTransition: method by the animator.  It may
		// be NO in the case of a cancelled interactive transition.
		if completed == true {
			// The system removes the presented view controller's view from its
			// superview and disposes of the containerView.  This implicitly
			// removes the views created in -presentationTransitionWillBegin: from
			// the view hierarchy.  However, we still need to relinquish our strong
			// references to those view.
			self.dimmingView = nil
		}
	}
	
	
	
	override func containerViewWillLayoutSubviews() {
		dimmingView.frame = (containerView?.bounds)!
		presentedView!.frame = frameOfPresentedViewInContainerView
	}
	
	// MARK: - Outlets
	// MARK: Recognizer handlers
	@objc func handleTapGesture(_ recognizer: UITapGestureRecognizer) {
		self.presentingViewController.dismiss(animated: true, completion: nil)
	}
	
	@IBAction func handlePanGesture(_ recognizer: UIPanGestureRecognizer) {
		let percentThreshold:CGFloat = 0.3
		
		let view = presentedViewController.view!
		
		// convert y-position to downward push progress (percentage)
		let translation = recognizer.translation(in: view)
		
		let progress: CGFloat
		if translation.y > 0 {
			progress = 0
		} else {
			let verticalMovement = abs(translation.y) / view.bounds.height
			let downwardMovement = fmaxf(Float(verticalMovement), 0.0)
			let downwardMovementPercent = fminf(downwardMovement, 1.0)
			progress = CGFloat(downwardMovementPercent)
		}
		
		
		switch recognizer.state {
		case .began:
			interactor.hasStarted = true
			presentedViewController.dismiss(animated: true, completion: nil)
		case .changed:
			interactor.shouldFinish = progress > percentThreshold
			interactor.update(progress)
		case .cancelled:
			interactor.hasStarted = false
			interactor.cancel()
		case .ended:
			
			interactor.hasStarted = false
			interactor.shouldFinish
				? interactor.finish()
				: interactor.cancel()
		default:
			break
		}
	}
	
}

