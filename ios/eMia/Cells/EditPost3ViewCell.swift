//
//  EditPost3ViewCell.swift
//  eMia
//

import UIKit

// Static text, Date, Send Email button

class EditPost3ViewCell: UITableViewCell, ForPostConfigurable {

   @IBOutlet weak var dateLabel: UILabel!
   @IBOutlet weak var commentLabel: UILabel!
   @IBOutlet weak var descriptionLabel: UILabel!
   @IBOutlet weak var sendEmailButtonView: UIView!
   
   override func awakeFromNib() {
      sendEmailButtonView.backgroundColor = GlobalColors.kBrandNavBarColor
   }

   func configureView(for post: PostModel) -> CGFloat {
      dateLabel.text = "Created".localized + " " + post.relativeTimeToCreated()
      
      return -1.0
   }
   
}

