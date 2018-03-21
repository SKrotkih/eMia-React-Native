//
//  EditPost1ViewCell.swift
//  eMia
//

import UIKit

protocol ForPostConfigurable {
   func configureView(for post: PostModel) -> CGFloat
}

// User's avatar photo and name

class EditPost1ViewCell: UITableViewCell, ForPostConfigurable {

   @IBOutlet weak var avatarBackgroundView: UIView!
   @IBOutlet weak var avatarUserImageView: UIImageView!
   @IBOutlet weak var nameUserLabel: UILabel!

   @IBOutlet weak var favoriteButtonBackgroundView: UIView!
   @IBOutlet weak var favoriteButtonImageView: UIImageView!
   
   fileprivate var post: PostModel?
   
   override func awakeFromNib() {
      NotificationCenter.default.addObserver(self, selector: #selector(didChangeFavoriteDataBase), name: Notification.Name(Notifications.ChangeData.FavoritesDataBase), object: nil)
      configure(avatarBackgroundView)
      configure(favoriteButtonBackgroundView)
   }

   deinit {
      NotificationCenter.default.removeObserver(self, name: Notification.Name(Notifications.ChangeData.FavoritesDataBase), object: nil)
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case avatarBackgroundView:
         avatarBackgroundView.layer.cornerRadius = avatarBackgroundView.frame.height / 2.0

      case avatarUserImageView:
         if let userId = post?.uid {
            PhotosManager.downloadAvatar(for:  userId) { image in
               DispatchQueue.main.async {
                  self.avatarUserImageView.image = image
               }
            }
         }
      
      case favoriteButtonBackgroundView:
         if let post = self.post {
            let isItMyPost = PostsManager.isItMyPost(post)
            self.favoriteButtonBackgroundView.isHidden = isItMyPost
            if isItMyPost == false {
               let tapGesture = UITapGestureRecognizer(target: self, action: #selector(favoriteButtonPressed(_:)))
               favoriteButtonBackgroundView.addGestureRecognizer(tapGesture)
            }
         }

      case favoriteButtonImageView:
         if let post = self.post {
            let isItMyFavoritePost = FavoritsManager.isItMyFavoritePost(post)
            DispatchQueue.main.async {
               self.favoriteButtonImageView.image = UIImage(named: isItMyFavoritePost ? "icon-toggle_star" : "icon-toggle_star_outline")
            }
         }
      
      case nameUserLabel:
         if let userId = post?.uid {
            if let user = UsersManager.getUserWith(id: userId) {
               self.nameUserLabel.text = user.name
            } else {
               self.nameUserLabel.text = nil
            }
         }
         
      default:
         break
      }
      
   }
   
   func configureView(for post: PostModel) -> CGFloat {
      self.post = post
      configure(nameUserLabel)
      configure(favoriteButtonImageView)
      configure(favoriteButtonBackgroundView)
      configure(avatarUserImageView)
      return -1.0
   }
   
   @objc func favoriteButtonPressed(_ gesture: UITapGestureRecognizer) {
      guard let post = self.post else {
         return
      }
      FavoritsManager.addToFavorite(post: post)
   }
   
   @objc func didChangeFavoriteDataBase(_ notification: NSNotification) {
      configure(favoriteButtonImageView)
   }
}
