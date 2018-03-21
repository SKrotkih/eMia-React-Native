//
//  UserObserver.swift
//  eMia
//

import UIKit

class UserObserver: NSObject {

   fileprivate var observers: Array<(users: [UserModel], closure: UserObserverClosure)> = []

   func addObserver(users: [UserModel], closure: @escaping UserObserverClosure) {
      removeObservers(users)
      observers.append((users, closure))
   }
   
   func removeObservers(_ users: [UserModel]) {
      if observers.count == 0 {
         return
      }
      var observerIndex = 0
      for item in observers {
         let itemUsers = item.users
         var counter = itemUsers.count
         if counter == users.count {
            for index in 0..<users.count {
               let user = users[index]
               let itemUser = itemUsers[index]
               if itemUser.userId == user.userId {
                  counter -= 1
               }
            }
         }
         if counter == 0 {
            observers.remove(at: observerIndex)
            break
         }
         observerIndex += 1
      }
   }

   func didUserUpdate(_ userIten: UserItem) {
      for item in observers {
         let users = item.users
         for user in users {
            if user.userId == userIten.userId {
               let updatedUser = UserModel(item: userIten)
               item.closure(updatedUser)
            }
         }
      }
   }
}
