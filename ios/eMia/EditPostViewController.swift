//
//  EditPostViewController.swift
//  eMia
//

import UIKit
import IQKeyboardManagerSwift
import NVActivityIndicatorView

protocol CommentsUpdatable {
   func didUpdateCommentsData()
}

class EditPostViewController: UIViewController {

   internal struct CellName {
      static let editPost1ViewCell = "EditPost1ViewCell"
      static let editPost2ViewCell = "EditPost2ViewCell"
      static let editPost3ViewCell = "EditPost3ViewCell"
      static let editPost4ViewCell = "EditPost4ViewCell"
      static let editPost5ViewCell = "EditPost5ViewCell"
      static let editPost6ViewCell = "EditPost6ViewCell"
   }

   enum Rows: Int {
      case AvatarPhotoAndUserName
      case DependsOnTextViewContent
      case Photo
      case StaticTextAndSendEmailButton
      case EnterCommentTextAndSendButton
      
      static var count: Int {
         return 5
      }
   }

   static fileprivate let kMinCommentCellHeight: CGFloat = 58.0
   
   var post: PostModel!
   fileprivate var comments: [CommentModel]!
   
   @IBOutlet weak var tableView: UITableView!
   @IBOutlet weak var activityIndicator: NVActivityIndicatorView!
   
   fileprivate var postBodyTextViewHeight: CGFloat = 0.0
   
   fileprivate var currentCelHeight: CGFloat = EditPostViewController.kMinCommentCellHeight
   fileprivate var commentCell: EditPost4ViewCell!
   fileprivate var needUpdateView: Bool = true
   
   fileprivate var commentsManager = CommentsManager()
   
   override func viewDidLoad() {
      super.viewDidLoad()

      navigationItem.title = post.title

      Appearance.customize(viewController: self)
      
      configureViews()
      
      commentsManager.startCommentsObserver(for: post, delegate: self)
   }

   private func configureViews() {
      configure(tableView)
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case tableView:
         tableView.rowHeight = UITableViewAutomaticDimension
         tableView.estimatedRowHeight = 140
         tableView.delegate = self
         tableView.dataSource = self
      default:
         break
      }
   }
   
   override func viewWillAppear(_ animated: Bool) {
      super.viewWillAppear(animated)
      
      downloadComments()
   }
   
   @IBAction func backButtonPressed(_ sender: Any) {
      navigationController?.popViewController(animated: true)
   }
}

extension EditPostViewController: UITableViewDataSource, UITableViewDelegate {
   
   public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
      return Rows.count + comments.count
   }
   
   // TODO: - TRY TO USE https://mkswap.net/m/ios/2015/07/08/uitableviewcells-with-dynamic-height.html
   
   public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
      if let selector: Rows = Rows(rawValue: indexPath.row) {
         switch selector {
         case .AvatarPhotoAndUserName:
            return 70.0
         case .DependsOnTextViewContent:
            return postBodyTextViewHeight
         case .Photo:
            return 300.0
         case .StaticTextAndSendEmailButton:
            return 135.0
         case .EnterCommentTextAndSendButton:
            return currentCelHeight
         }
      } else {
         if comments.count > 0 {
            return -1.0
         } else {
            return 0.0
         }
      }
   }
   
   public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      if let selector: Rows = Rows(rawValue: indexPath.row) {
         switch selector {
         case .AvatarPhotoAndUserName:
            let cell1 = tableView.dequeueReusableCell(withIdentifier: CellName.editPost1ViewCell) as! EditPost1ViewCell
            let _ = cell1.configureView(for: post)
            return cell1
         case .DependsOnTextViewContent:
            let cell2 = tableView.dequeueReusableCell(withIdentifier: CellName.editPost2ViewCell) as! EditPost2ViewCell
            postBodyTextViewHeight = cell2.configureView(for: post)
            return cell2
         case .Photo:
            let cell6 = tableView.dequeueReusableCell(withIdentifier: CellName.editPost6ViewCell) as! EditPost6ViewCell
            let _ = cell6.configureView(for: post)
            return cell6
         case .StaticTextAndSendEmailButton:
            let cell3 = tableView.dequeueReusableCell(withIdentifier: CellName.editPost3ViewCell) as! EditPost3ViewCell
            let _ = cell3.configureView(for: post)
            return cell3
         case .EnterCommentTextAndSendButton:
            commentCell = tableView.dequeueReusableCell(withIdentifier: CellName.editPost4ViewCell) as! EditPost4ViewCell
            let _ = commentCell.configureView(for: post)
            commentCell.post = post
            commentCell.activityIndicator = activityIndicator
            commentCell.didChangeHeight = { newCellHeight in
               if newCellHeight != self.currentCelHeight {
                  self.currentCelHeight = newCellHeight
                  self.updateView()
               }
            }
            commentCell.didEnterNewComment = {
               self.needUpdateView = false
            }
            return commentCell
         }
      } else {
         if comments.count > 0 {
            let cell5 = tableView.dequeueReusableCell(withIdentifier: CellName.editPost5ViewCell) as! EditPost5ViewCell
            let _ = cell5.configureView(for: post)
            let comment = comments[indexPath.row - Rows.count]
            cell5.configureView(for: comment)
            return cell5
         } else {
            let cell0 = UITableViewCell()
            return cell0
         }
      }
   }
   
   private func updateView() {
      self.tableView.reloadData()
      if self.needUpdateView == false {
         self.needUpdateView = true
         return
      }
      runAfterDelay(0.3) {
         let _ = self.commentCell.commentTextView.becomeFirstResponder()
      }
   }
}

// MARK: - CommentsUpdatable

extension EditPostViewController: CommentsUpdatable {

   fileprivate func downloadComments() {
      comments = commentsManager.comments
      tableView.reloadData()
   }
   
   func didUpdateCommentsData() {
      downloadComments()
   }
}
