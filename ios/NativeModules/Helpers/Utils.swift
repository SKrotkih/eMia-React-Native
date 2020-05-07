//
//  Utils.swift
//  eMia
//

import Foundation

func runAfterDelay(_ delay: TimeInterval, block: @escaping ()->()) {
    let time = DispatchTime.now() + Double(Int64(delay * Double(NSEC_PER_SEC))) / Double(NSEC_PER_SEC)
    DispatchQueue.main.asyncAfter(deadline: time, execute: block)
}

