//
//  UserModel.swift
//  eMia
//

import UIKit

final class UserModel: NSObject, NSCoding {
   
   var ref: Any?
   var key: String
   var userId: String
   var name: String
   var email: String
   var address: String?
   var gender: Gender?
   var yearbirth: Int?
   var tokenIOS: String?
   var tokenAndroid: String?

   override init() {
      self.ref = nil
      self.key = ""
      self.userId = ""
      self.name = ""
      self.email = ""
      self.address = nil
      self.gender = nil
      self.yearbirth = nil
      self.tokenIOS = nil
      self.tokenAndroid = nil
   }

   convenience init(coder decoder: NSCoder) {
      self.init()
      self.key = decoder.decodeObject(forKey: UserFields.key) as? String ?? ""
      self.userId = decoder.decodeObject(forKey: UserFields.userId) as? String ?? ""
      self.name = decoder.decodeObject(forKey: UserFields.name) as? String ?? ""
      self.email = decoder.decodeObject(forKey: UserFields.email) as? String ?? ""
      self.address = decoder.decodeObject(forKey: UserFields.address) as? String ?? ""
      self.gender = decoder.decodeObject(forKey: UserFields.gender) as? Gender ?? .boy
      self.yearbirth = decoder.decodeObject(forKey: UserFields.yearbirth) as? Int ?? 0
      self.tokenIOS = decoder.decodeObject(forKey: UserFields.tokenIOS) as? String ?? ""
      self.tokenAndroid = decoder.decodeObject(forKey: UserFields.tokenAndroid) as? String ?? ""
   }
   
   func encode(with coder: NSCoder) {
      coder.encode(key, forKey: UserFields.key)
      coder.encode(userId, forKey: UserFields.userId)
      coder.encode(name, forKey: UserFields.name)
      coder.encode(email, forKey: UserFields.email)
      coder.encode(address, forKey: UserFields.address)
      coder.encode(gender, forKey: UserFields.gender)
      coder.encode(yearbirth, forKey: UserFields.yearbirth)
      coder.encode(tokenIOS, forKey: UserFields.tokenIOS)
      coder.encode(tokenAndroid, forKey: UserFields.tokenAndroid)
   }
   
   convenience init(name: String, email: String, address: String?, gender: Gender?, yearbirth: Int?) {
      self.init()
      self.name = name
      self.email = email
      self.address = address
      self.gender = gender
      self.yearbirth = yearbirth
   }

   convenience init(key: String, userId: String, name: String, email: String, address: String?, gender: Gender?, yearbirth: Int?, tokenIOS: String?, tokenAndroid: String?, ref: Any?) {
      self.init(name: name, email: email, address: address, gender: gender, yearbirth: yearbirth)
      self.key = key
      self.ref = ref
      self.userId = userId
      self.tokenIOS = tokenIOS
      self.tokenAndroid = tokenAndroid
   }
   
   convenience init(item: UserItem) {
      self.init(key: item.key, userId: item.userId, name: item.username, email: item.email, address: item.address, gender: Gender(rawValue: item.gender), yearbirth: item.yearbirth, tokenIOS: item.tokenIOS, tokenAndroid: item.tokenAndroid, ref: item.ref)
   }
   
   func copy(_ rhs: UserModel) {
      self.key = rhs.key
      self.userId = rhs.userId
      self.name = rhs.name
      self.email = rhs.email
      self.address = rhs.address
      self.gender = rhs.gender
      self.yearbirth = rhs.yearbirth
      self.tokenIOS = rhs.tokenIOS
      self.tokenAndroid = rhs.tokenAndroid
      self.ref = rhs.ref
   }
}

extension UserModel {
   
   func synchronize(completion: @escaping (Bool) -> Void) {
      let userItem = UserItem(user: self)
      userItem.synchronize(completion: completion)
   }
}

func == (lhs: UserModel, rhs: UserModel) -> Bool {
   return lhs.key == rhs.key
}
