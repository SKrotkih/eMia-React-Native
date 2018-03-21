//
//  EditPost4ViewCell.swift
//  eMia
//

import UIKit
import NextGrowingTextView
import NVActivityIndicatorView

// Comment text enter field

class EditPost4ViewCell: UITableViewCell, ForPostConfigurable {

   @IBOutlet weak var commentTextView: NextGrowingTextView!
   @IBOutlet weak var sendCommentButton: UIButton!
   
   weak var activityIndicator: NVActivityIndicatorView!

   var didChangeHeight: (CGFloat) -> Void = { _ in }
   var didEnterNewComment: () -> Void = { }
   var post: PostModel!
   
   private var plusSpace: CGFloat!
   
   override func awakeFromNib() {
      configure(sendCommentButton)
      configure(commentTextView)
      
      plusSpace = self.frame.height - commentTextView.frame.height
   }

   private func configure(_ view: UIView) {
      switch view {
      case sendCommentButton:
         sendCommentButton.setTitle("Send Comment".localized, for: .normal)
         sendCommentButton.setTitleColor(GlobalColors.kBrandNavBarColor, for: .normal)
      case commentTextView:
         commentTextView.maxNumberOfLines = 10
         commentTextView.delegates.didChangeHeight = { height in
            let currentCellHeigt = height + self.plusSpace
            self.didChangeHeight(currentCellHeigt)
         }
      default:
         break
      }
   }
   
   func configureView(for post: PostModel) -> CGFloat {
      return -1.0
   }

   @IBAction func sendCommentButtonPressed(_ sender: Any) {
      sendComment()
   }
}

// MARK: - Save comment

extension EditPost4ViewCell {
   
   fileprivate func sendComment() {
      guard let text = commentTextView.textView.text, text.isEmpty == false else {
         return
      }
      guard let currentUser = UsersManager.currentUser else {
         return
      }
      activityIndicator.startAnimating()
      let comment = CommentModel(uid: currentUser.userId, author: currentUser.name, text: text, postid: post.id!)
      comment.synchronize() { success in
         if success {
            self.didEnterNewComment()
            self.commentTextView.textView.text = ""
            let _ = self.commentTextView.resignFirstResponder()
         }
         self.activityIndicator.stopAnimating()
      }
   }
}
