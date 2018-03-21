//
//  SegueRawRepresentable.swift
//  eMia
//

import UIKit

protocol SegueRawRepresentable {
    associatedtype SegueType: RawRepresentable
}

extension SegueRawRepresentable where Self: UIViewController, SegueType.RawValue == String {
	
	/// Check if segue should be executed and then perform it
	///
	/// - Parameters:
	///   - identifier: Segue type
	///   - sender: any control or view
	func executeSegue(_ identifier: SegueType, sender: Any?){
		if shouldPerformSegue(withIdentifier: identifier.rawValue, sender: sender) {
			performSegue(withIdentifier: identifier.rawValue, sender: sender)
		}
	}
   
    func performSegue(_ identifier: SegueType, sender: Any?) {
        performSegue(withIdentifier: identifier.rawValue, sender: sender)
    }
    
    func shouldPerformSegue(_ identifier: SegueType, sender: Any?) -> Bool {
        return shouldPerformSegue(withIdentifier: identifier.rawValue, sender: sender)
    }
    
    func segueType(for segue: UIStoryboardSegue) -> SegueType {
        guard let identifier = segue.identifier, let segueIdentifier = SegueType(rawValue: identifier) else {
            fatalError("Invalid segue identiifer \(segue.identifier ?? "NaN")")
        }
        return segueIdentifier
    }
    
    func segueType(for identifier: String?) -> SegueType {
        guard let str = identifier, let segueIdentifier = SegueType(rawValue: str) else {
            fatalError("Invalid segue identiifer \(identifier ?? "NaN")")
        }
        return segueIdentifier
    }
}
