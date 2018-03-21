//
//  GalleryViewCell.swift
//  eMia
//

import UIKit
import DTCollectionViewManager
import DTModelStorage

class GalleryViewCell: UICollectionViewCell, ModelTransfer {

    private let widthPhotoDefault: CGFloat = 200.0
    private let heightPhotoDefault: CGFloat = 100.0
    
    @IBOutlet weak var borderView: UIView!
    
    @IBOutlet weak var photoImageView: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var bodyLabel: UILabel!
    @IBOutlet weak var favoriteImageView: UIImageView!
    @IBOutlet weak var photoHeightConstraint: NSLayoutConstraint!
    
    @IBOutlet weak var border1: UIView!
    @IBOutlet weak var border2: UIView!
    @IBOutlet weak var border3: UIView!
    @IBOutlet weak var border4: UIView!
    
    func update(with post: PostModel) {
        post.getPhoto() { image in
            self.photoImageView.image = image
            if post.photoSize == (0.0, 0.0), let size = image?.size {
                post.photoSize = (size.width, size.height)
                post.synchronize() { _ in}
            }
        }
        let isItMyFavoritePost = FavoritsManager.isItMyFavoritePost(post)
        favoriteImageView.image = isItMyFavoritePost ? UIImage(named: "icon-toggle_star") : nil
        titleLabel.text = post.title
        bodyLabel.text = post.body

        var defaultWidth = post.photoSize.0
        var defaultHeight = post.photoSize.1
        if post.photoSize == (0.0, 0.0) {
            defaultWidth = widthPhotoDefault
            defaultHeight = heightPhotoDefault
        }
        photoHeightConstraint.constant = self.frame.width / defaultWidth * defaultHeight
    }
    
    override func awakeFromNib() {
        titleLabel.textColor = GlobalColors.kBrandNavBarColor
        bodyLabel.textColor = GlobalColors.kBrandNavBarColor
        
        borderView.layer.borderColor = UIColor.lightGray.cgColor
        borderView.layer.borderWidth = 1
        borderView.layer.cornerRadius = 8
        
        let borderColor = UIColor.clear
        border1.backgroundColor = borderColor
        border2.backgroundColor = borderColor
        border3.backgroundColor = borderColor
        border4.backgroundColor = borderColor
    }
}

