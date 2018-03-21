//
//  PushNotification.swift
//  eMia
//

import UIKit
import SwiftyJSON

enum PushNotificationRecieve {
   
   case like(post: PostModel, from: UserModel)

   init?(with json: JSON) {
		switch json["messageType"].string {
		case PushNotification.Identifier.like?:
         
         guard let postid = json["userinfo"].string else {
            assertionFailure("Missing `userinfo` field")
            return nil
         }

         guard let post = PostsManager.getPost(with: postid) else {
            assertionFailure("User `uid` is not presented!")
            return nil
         }

         guard let uid = json["uid"].string else {
				assertionFailure("Missing `uid` field")
				return nil
			}
			
         guard let user = UsersManager.getUserWith(id: uid) else {
            assertionFailure("User `uid` is not presented!")
            return nil
         }
         
         self = .like(post: post, from: user)
			
		default:
         return nil
		}
	}
}

enum PushNotification {
   case like(post: PostModel)
	
	struct Identifier {
		static let like = "\(AppConstants.ApplicationName).Post.like"
	}
	
	var identifier: String {
		switch self {
		case .like:
         return Identifier.like
		}
	}
}

	
// MARK: - Send notification
extension PushNotification {

	var title: String {
      let userName = UsersManager.currentUser!.name
      return String.localizedStringWithFormat("User `%@` likes your post".localized, userName)
	}
	
	var body: String {
		switch self {
      case let .like(post):
         let postTitle = post.title.prefix(15) as CVarArg
         return String.localizedStringWithFormat("`%@...`".localized, postTitle)
		}
	}
   
	/// Array of notifications which should be sent
    func notifications(_ completion: @escaping ([Data]) -> Void) {
		switch self {
		case let .like(post):
         guard let user = self.senderPost(post) else {
            return
         }
         getTokens(user: user) { (androidTokens, iOSTokens) in
            var array = [Data]()
            for token in androidTokens {
               var json = JSON([:])
               json["to"].stringValue = token
               json["data"] = JSON([:])
               json["data"]["uid"].string = UsersManager.currentUser!.userId
               json["data"]["title"].string = self.title
               json["data"]["body"].string = self.body
               json["data"]["messageType"].stringValue = self.identifier
               json["data"]["userinfo"].string = post.id!
               json["data"]["sound"].string = "default"
               do {
                  let jsonData =  try json.rawData(options: .prettyPrinted)
                  array.append(jsonData)
               }
               catch {
                  print(String(describing: type(of: self)),":", #function, "  ", error.localizedDescription)
                  assertionFailure()
                  continue
               }
            }
            for token in iOSTokens {
               if self.acceptedToken(token) {
                  var json = JSON([:])
                  json["to"].stringValue = token
                  json["notification"] = JSON([:])
                  json["notification"]["body"].string = self.body
                  json["notification"]["title"].string = self.title
                  json["notification"]["sound"].string = "default"
                  json["data"] = JSON([:])
                  json["data"]["uid"].string = UsersManager.currentUser!.userId
                  json["data"]["userinfo"].string = post.id!
                  json["data"]["messageType"].stringValue = self.identifier
                  do {
                     let jsonData =  try json.rawData(options: .prettyPrinted)
                     array.append(jsonData)
                  }
                  catch {
                     print(String(describing: type(of: self)),":", #function, "  ", error.localizedDescription)
                     assertionFailure()
                     continue
                  }
               }
            }
            completion(array)
         }
      }
	}

   fileprivate func getTokens(user: UserModel, _ completion: @escaping ([String], [String]) -> Void) {
      DeviceTokenController.androidTokens(for: user) { androidTokens in
         DeviceTokenController.iOSTokens(for: user) { iOSTokens in
            completion(androidTokens, iOSTokens)
         }
      }
   }
   
   private func acceptedToken(_ token: String) -> Bool {
      return DeviceTokenController.myDeviceTokens.index(where: {$0 == token}) == nil
   }
   
   private func senderPost(_ post: PostModel) -> UserModel? {
      return UsersManager.getUserWith(id: post.uid)
   }
}
