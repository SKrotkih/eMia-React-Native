//
//  FilterPresentationSegue.swift
//  eMia
//

import UIKit

class FilterPresentationSegue: UIStoryboardSegue {
	var presentation: FilterPresntationController!
	
	override func perform() {
		destination.modalPresentationStyle = .custom
		destination.transitioningDelegate = self
		
		super.perform()
	}
}

extension FilterPresentationSegue: UIViewControllerTransitioningDelegate {
	func presentationController(forPresented presented: UIViewController, presenting: UIViewController?, source: UIViewController) -> UIPresentationController? {
		presentation = FilterPresntationController(presentedViewController: presented, presenting: presenting)
		return presentation
	}
	
	func animationController(forPresented presented: UIViewController, presenting: UIViewController, source: UIViewController) -> UIViewControllerAnimatedTransitioning? {
		let animationController = FilterAnimatedTransitioning()
		animationController.isPresentation = true
		return animationController
	}
	
	func animationController(forDismissed dismissed: UIViewController) -> UIViewControllerAnimatedTransitioning? {
		let animationController = FilterAnimatedTransitioning()
		animationController.isPresentation = false
		return animationController
	}
	
	func interactionControllerForDismissal(using animator: UIViewControllerAnimatedTransitioning) -> UIViewControllerInteractiveTransitioning? {
		return presentation.interactor.hasStarted ? presentation.interactor : nil
	}
	
}



