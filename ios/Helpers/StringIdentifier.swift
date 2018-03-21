//
//  Identifier.swift
//  eMia
//

import Foundation

struct StringIdentifier: RawRepresentable  {
    let rawValue: String
    init(rawValue: String) { self.rawValue = rawValue }
   
}

// MARK: - Hashable
extension StringIdentifier: Hashable {
    var hashValue: Int {
        return self.rawValue.hash
    }
}


// MARK: - Equatable
extension StringIdentifier: Equatable {
    static func ==(lhs: StringIdentifier, rhs: StringIdentifier) -> Bool {
        return lhs.rawValue == rhs.rawValue
    }
}

