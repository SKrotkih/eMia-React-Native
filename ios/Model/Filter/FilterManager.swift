//
//  FilterManager.swift
//  eMia
//

import UIKit

class FilterManager {
    
    enum Settings {
        static let filterMinAgeKey = "FilterManager.Settings.minValueKey"
        static let filterMaxAgeKey = "FilterManager.Settings.maxValueKey"
        static let filterMyFavoriteKey = "FilterManager.Settings.myFavoriteKey"
        static let filterGenderKey = "FilterManager.Settings.gender"
        static let filterMunicipalityKey = "FilterManager.Settings.municipality"
        static let filterIsInitialized = "FilterManager.Settings.filterIsInitialized"
    }
    
    var didFilerUpdateCallabck: () -> Void = { }
    private var queue: DispatchQueue = DispatchQueue(label: "\(AppConstants.ManufacturingName).\(AppConstants.ApplicationName).filterQueue")
    
    init() {
        setUpDefaults()
    }
    
    private func setUpDefaults() {
        if UserDefaults.standard.bool(forKey: Settings.filterIsInitialized) {
            return
        }
        UserDefaults.standard.set(FilterFavorite.all.rawValue, forKey: Settings.filterMyFavoriteKey)
        UserDefaults.standard.set(Gender.both.rawValue, forKey: Settings.filterGenderKey)
        UserDefaults.standard.set(0.0, forKey: Settings.filterMinAgeKey)
        UserDefaults.standard.set(100.0, forKey: Settings.filterMaxAgeKey)
        UserDefaults.standard.set(true, forKey: Settings.filterIsInitialized)
        UserDefaults.standard.synchronize()
    }
    
    private func didFilterUpdate() {
        didFilerUpdateCallabck()
    }
    
    var myFavoriteFilter :FilterFavorite {
        set {
            queue.async {
                UserDefaults.standard.set(newValue.rawValue, forKey: Settings.filterMyFavoriteKey)
                UserDefaults.standard.synchronize()
                self.didFilterUpdate()
            }
        }
        get {
            return queue.sync {
                let status = UserDefaults.standard.integer(forKey: Settings.filterMyFavoriteKey)
                if let value = FilterFavorite(rawValue: Int16(status)) {
                    return value
                } else {
                    return FilterFavorite(rawValue: FilterFavorite.all.rawValue)!
                }
            }
        }
    }
    
    var genderFilter: Gender {
        set {
            queue.async {
                UserDefaults.standard.set(newValue.rawValue, forKey: Settings.filterGenderKey)
                UserDefaults.standard.synchronize()
                self.didFilterUpdate()
            }
        }
        get {
            return queue.sync {
                let genderRowValue = UserDefaults.standard.integer(forKey: Settings.filterGenderKey)
                if let gender = Gender(rawValue: Int(genderRowValue)) {
                    return gender
                } else {
                    return .both
                }
            }
        }
    }
    
    var municipality: String? {
        set {
            queue.async {
                UserDefaults.standard.set(newValue, forKey: Settings.filterMunicipalityKey)
                UserDefaults.standard.synchronize()
                self.didFilterUpdate()
            }
        }
        get {
            return queue.sync {
                UserDefaults.standard.string(forKey: Settings.filterMunicipalityKey)
            }
        }
    }
    
    var minAge: CGFloat {
        set {
            queue.async {
                UserDefaults.standard.set(newValue, forKey: Settings.filterMinAgeKey)
                UserDefaults.standard.synchronize()
                self.didFilterUpdate()
            }
        }
        get {
            return queue.sync {
                CGFloat(UserDefaults.standard.float(forKey: Settings.filterMinAgeKey))
            }
        }
    }
    
    var maxAge: CGFloat {
        set {
            queue.async {
                UserDefaults.standard.set(newValue, forKey: Settings.filterMaxAgeKey)
                UserDefaults.standard.synchronize()
                self.didFilterUpdate()
            }
        }
        get {
            return queue.sync {
                CGFloat(UserDefaults.standard.float(forKey: Settings.filterMaxAgeKey))
            }
        }
    }

    func filterPosts(_ posts: [PostModel], searchText: String = "") -> [PostModel] {
        let filteredPosts = posts.filter({ post in
            return self.check(post: post, whatSearch: searchText)
        })
        return filteredPosts
    }
    
    func check(post: PostModel, whatSearch: String) -> Bool {
        // Favorities
        var addFavorite = false
        if self.myFavoriteFilter == .myFavorite {
            if FavoritsManager.isItMyFavoritePost(post) {
                addFavorite = true
            }
        } else if self.myFavoriteFilter == .all {
            addFavorite = true
        }
        
        var addGender = false
        var addMunicipality = false
        var addAge = false
        
        if let user = UsersManager.getUserWith(id: post.uid) {
            // Gender
            if self.genderFilter == .both {
                addGender = true
            } else if self.genderFilter == .boy && user.gender == .boy {
                addGender = true
            } else if self.genderFilter == .girl && user.gender == .girl {
                addGender = true
            }
            // Municipality
            if let municipality = self.municipality {
                if let address = user.address, address == municipality {
                    addMunicipality = true
                }
            } else {
                addMunicipality = true
            }
            
            let minAge = Int(self.minAge)
            let maxAge = Int(self.maxAge)
            if minAge == 0 && maxAge == 100 {
                // Don't filter by age
                addAge = true
            } else if let yearBirth = user.yearbirth, yearBirth > 0 {
                let userAge = Date().years - yearBirth
                addAge = userAge >= minAge && userAge <= maxAge
            } else {
                addAge = false
            }
        }
        
        if addFavorite && addGender && addMunicipality && addAge {
            var isValidvalue = false
            if whatSearch.isEmpty {
                isValidvalue = true
            } else {
                let title = post.title
                let body = post.body
                if title.lowercased().range(of: whatSearch.lowercased()) != nil {
                    isValidvalue = true
                } else if body.lowercased().range(of: whatSearch.lowercased()) != nil {
                    isValidvalue = true
                }
            }
            return isValidvalue
        } else {
            return false
        }
    }
}
