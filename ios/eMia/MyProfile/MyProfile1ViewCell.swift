//
//  MyProfile1ViewCell.swift
//  eMia
//
//  Created by Sergey Krotkih on 12/20/17.
//  Copyright © 2017 Coded I/S. All rights reserved.
//

import UIKit

class MyProfile1ViewCell: UITableViewCell {
   
   @IBOutlet weak var avatarBackgroundView: UIView!
   @IBOutlet weak var avatarImageView: UIImageView!
   @IBOutlet weak var titleLabel: UILabel!
   
   override func awakeFromNib() {
      super.awakeFromNib()
   }

   func configure() {
      configure(titleLabel)
      configure(avatarBackgroundView)
      configure(avatarImageView)
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case titleLabel:
         titleLabel.textColor = GlobalColors.kBrandNavBarColor
         if let currentUser = UsersManager.currentUser {
            titleLabel.text = currentUser.name
         }
      case avatarBackgroundView:
         avatarBackgroundView.layer.cornerRadius = avatarBackgroundView.frame.height / 2.0
      case avatarImageView:
         if let currentUser = UsersManager.currentUser {
            PhotosManager.downloadAvatar(for: currentUser.userId) { image in
               self.avatarImageView.image = image
            }
         }
      default:
         break
      }
   }
   
   override func setSelected(_ selected: Bool, animated: Bool) {
      super.setSelected(selected, animated: animated)
      
      // Configure the view for the selected state
   }
   
}

