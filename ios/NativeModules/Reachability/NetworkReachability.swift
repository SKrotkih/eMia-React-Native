//
//  NetworkReachability.swift
//  KMApp
//

import Foundation

internal let InternetState = InternetStateImpl.default

class InternetStateImpl {

    static let `default` = InternetStateImpl()

    private var timer: Timer?
    private let group = DispatchGroup()
    
    private init() {
    }
    
    deinit {
        if let timer = self.timer {
            timer.invalidate()
        }
    }
    
    func isConnected(_ needNotification: Bool = false, _ completion: (() -> Void)? = nil) -> Bool {
        if isInternetReachable(needNotification) {
            return true
        }
        if let completion = completion {
            waitingWhileConnected(needNotification, completion)
            return false
        } else {
            return false
        }
    }
    
    private func isInternetReachable(_ needNotification: Bool = false) -> Bool {
        // Creates an instance that monitors the address 0.0.0.0
//        guard let reachabilityManager = NetworkReachabilityManager() else {
//            return false
//        }
//        let isReachable = reachabilityManager.isReachable

      let isReachable = true
      if !isReachable && needNotification {
           PopUpReachabilityView.show()
        }
        return isReachable
    }
    
    private func waitingWhileConnected(_ needNotification: Bool, _ completion: @escaping () -> Void) {
        timer = Timer.scheduledTimer(withTimeInterval: 5, repeats: true) { _ in
            if self.isInternetReachable(needNotification) {
                self.timer?.invalidate()
                self.timer = nil
                completion()
            }
        }
    }
}
