//
//  EditPost6ViewCell.swift
//  eMia
//

import UIKit

class EditPost6ViewCell: UITableViewCell, ForPostConfigurable {

   fileprivate var _imageViewController: SFFullscreenImageDetailViewController?
   
   @IBOutlet weak var photoImageView: UIImageView!
   
   override func awakeFromNib() {
      photoImageView.isUserInteractionEnabled = true
      let tap = UITapGestureRecognizer(target: self, action: #selector(self.didPressImageView(_:)))
      photoImageView.addGestureRecognizer(tap)
   }

   func configureView(for post: PostModel) -> CGFloat {
      post.getPhoto() { image in
         self.photoImageView.image = image
      }
      return -1.0
   }
   
   @objc func didPressImageView(_ recognizer: UITapGestureRecognizer) {
      _imageViewController = SFFullscreenImageDetailViewController(imageView: photoImageView)
      _imageViewController?.presentInCurrentKeyWindow()
   }

}
