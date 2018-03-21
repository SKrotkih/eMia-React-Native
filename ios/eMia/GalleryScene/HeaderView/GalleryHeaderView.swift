//
//  GalleryHeaderView.swift
//  eMia
//

import UIKit
import DTModelStorage

class GalleryHeaderView: UICollectionReusableView, ModelTransfer {

    @IBOutlet weak var title: UILabel!
    
    func update(with model: String) {
        title.text = model
    }
   
   override func awakeFromNib() {
      self.backgroundColor = GlobalColors.kBrandNavBarColor
      title.textColor = UIColor.white
   }
   
}
