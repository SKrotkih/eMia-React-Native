//
//  LocationManager.swift
//  eMia
//
//  Created by Sergey Krotkih on 1/17/18.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit
import CoreLocation

class LocationManager: NSObject, CLLocationManagerDelegate {

   typealias DidUpdateLocationClosure = (CLLocation?) -> ()
   private var _myLocation: CLLocation?
   private var _completionClosure: DidUpdateLocationClosure?
   
   var myLocation: CLLocation? {
      return _myLocation
   }
   
   lazy var locationManager: CLLocationManager = {
      let manager = CLLocationManager()
      manager.delegate = self
      manager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters
      return manager
   }()

   func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
      _myLocation = locations.first
      _completionClosure?(myLocation)
   }
   
   func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
      _completionClosure?(nil)
      //TODO: handle the error
   }
   
   func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
      if case .authorizedWhenInUse = status{
         manager.requestLocation()
      } else {
         _completionClosure?(nil)
         //TODO: we didn't get access, handle this
      }
   }
   
   func requestLocation(completion: @escaping (CLLocation?) -> Void) {
      _completionClosure = completion
      locationManager.requestWhenInUseAuthorization()
   }
   
}
