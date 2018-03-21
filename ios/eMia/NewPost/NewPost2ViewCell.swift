//
//  NewPost2ViewCell.swift
//  eMia
//

import UIKit
import NextGrowingTextView

class NewPost2ViewCell: UITableViewCell {

   @IBOutlet weak var titleLabel: UILabel!
   @IBOutlet weak var postBodyTextView: NextGrowingTextView!
   
   var didChangeHeight: (CGFloat) -> Void = { _ in }
   
   override func awakeFromNib() {
      configure(titleLabel)
      configure(postBodyTextView)
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case titleLabel:
         titleLabel.text = "Write your post".localized
         titleLabel.textColor = GlobalColors.kBrandNavBarColor
      case postBodyTextView:
         postBodyTextView.maxNumberOfLines = 50
         postBodyTextView.delegates.didChangeHeight = { height in
            self.didChangeHeight(height + self.postBodyTextView.frame.minY + 9.5)
         }
      default:
         break
      }
   }
   var postBodyText: String {
      return postBodyTextView.textView.text ?? ""
   }
   
}
