//
//  Register1ViewCell.swift
//  eMia
//

import UIKit

protocol ForUserConfigurable {
   func configure(for user: UserModel)
}

// User's avatar photo and name

@IBDesignable class Register1ViewCell: UITableViewCell, ForUserConfigurable {

   @IBOutlet weak var emailTitleLabel: UILabel!
   @IBOutlet weak var emailTextField: UITextField!
   
   
   func configure(for user: UserModel) {
   }
   
   var email: String? {
      return emailTextField.text
   }

   override func willMove(toSuperview newSuperview: UIView!) {
      configure()
   }

   private func configure() {
      emailTitleLabel.text = "Email".localized
      emailTitleLabel.textColor = GlobalColors.kBrandNavBarColor
   }
   
   override func awakeFromNib() {
      configure()
   }
}
