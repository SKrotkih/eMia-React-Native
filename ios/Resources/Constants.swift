//
//  Constants.swift
//  eMia
//

import UIKit

// MARK: - Fields

struct UserFields {
   static let users = "users"
   static let key = "key"
   
   static let userId = "id"
   static let name = "username"
   static let email = "email"
   static let address = "address"
   static let gender = "gender"
   static let yearbirth = "yearbirth"
   static let tokenIOS = "tokenIOS"
   static let tokenAndroid = "tokenAndroid"
}

struct PostItemFields {
   static let posts = "posts"
   static let key = "key"
   
   static let id = "id"
   static let uid = "uid"
   static let author = "author"
   static let title = "title"
   static let body = "body"
   static let created = "created"
   static let portrait = "portrait"
   static let photosize = "photosize"
   static let starCount = "starCount"
}

struct FavoriteItemFields {
   static let favorits = "favorites"
   
   static let id = "id"
   static let uid = "uid"
   static let postid = "postid"
}

struct CommentItemFields {
   static let comments = "comments"
   static let key = "key"
   
   static let id = "id"
   static let uid = "uid"
   static let author = "author"
   static let text = "text"
   static let postid = "postid"
   static let created = "created"
}


// MARK: -

struct Notifications {
   
   struct Application {
      static let WillEnterForeground = "WillEnterForeground"
      static let DidBecomeActive = "DidBecomeActive"
      static let WillResignActive = "WillResignActive"
      static let DidEnterBackground = "DidEnterBackground"
   }
   
   struct ChangeData {
      static let UsersDataBase = "UsersDataBaseChanged"
      static let PostsDataBase = "RequestDataBaseChanged"
      static let CommentsDataBase = "AvatarDataBaseChanged"
      static let FavoritesDataBase = "FavoritesDataBaseChanged"
      static let CurrentUser = "CurrentUserChanged"
   }
   
   static let WillEnterMainScreen = "WillEnterMainScreen"
   
}

struct UserDefaultsKey {
   static let initUserEmailKey = "userEmail"
   static let initUserPasswordKey = "userPassword"
   static let kDeviceTokens = "DeviceTokens"
}

// MARK: - Default database name

struct DataBase {
   static let name = "main"
}

struct Firebase {
   static let ServerKey = "AIzaSyBwlP3fkou4NhVa6k_a7EMazGBZHDCXCw0"
   static let Storage_url = "gs://boblberg-b8a0f.appspot.com"
   static let PushNotificationUrl = "https://fcm.googleapis.com/fcm/send"
}

struct AppConstants {
   static let SizeAvatarImage = 72.0
   static let ApplicationName = "eMia"
   static let ManufacturingName = "dk.coded"
}

struct Settings {
   static let separator = ","
   static let tokenStoreKey = "CurrentDeviceToken"
}

struct Platform {
   
   static var isSimulator: Bool {
      return TARGET_OS_SIMULATOR != 0
   }
   
}


