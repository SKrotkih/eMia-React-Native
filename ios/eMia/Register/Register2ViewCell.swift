//
//  Register2ViewCell.swift
//  eMia
//

import UIKit

// Body text. variavle height table view cell!

class Register2ViewCell: UITableViewCell, ForUserConfigurable {

   @IBOutlet weak var passwordTitleLabel: UILabel!
   @IBOutlet weak var passwordTextField: UITextField!

   func configure(for user: UserModel) {
   }
   
   var password: String? {
      get {
         return passwordTextField.text
      }
      set {
         passwordTextField.text = newValue
      }
   }
   
   override func awakeFromNib() {
      passwordTitleLabel.text = "Password".localized
      passwordTitleLabel.textColor = GlobalColors.kBrandNavBarColor
   }
}

