//
//  MyProfile2ViewCell.swift
//  eMia
//
//  Created by Sergey Krotkih on 12/20/17.
//  Copyright © 2017 Coded I/S. All rights reserved.
//

import UIKit

class MyProfile2ViewCell: UITableViewCell {
   
   @IBOutlet weak var titleLabel: UILabel!
   
   override func awakeFromNib() {
      super.awakeFromNib()
      
      configure(titleLabel)
   }

   func setTitle(_ title: String) {
      titleLabel.text = title
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case titleLabel:
         titleLabel.textColor = GlobalColors.kBrandNavBarColor
      default:
         break
      }
   }
   
   override func setSelected(_ selected: Bool, animated: Bool) {
      super.setSelected(selected, animated: animated)
      
      // Configure the view for the selected state
   }
   
}

