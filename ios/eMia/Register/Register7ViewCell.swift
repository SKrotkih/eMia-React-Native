//
//  Register7ViewCell.swift
//  eMia
//

import UIKit

// User's Name

@IBDesignable class Register7ViewCell: UITableViewCell, ForUserConfigurable {

   @IBOutlet weak var nameTitleLabel: UILabel!
   @IBOutlet weak var nameTextField: UITextField!

   @IBInspectable var borderColor: UIColor {
      set {
         self.layer.borderColor = newValue.cgColor
      }
      get {
         return UIColor(cgColor: self.layer.borderColor ?? UIColor.white.cgColor)
      }
   }
   
   @IBInspectable var borderWidth : Int {
      set {
         self.layer.borderWidth = CGFloat(newValue)
      } get {
         return Int(self.layer.borderWidth)
      }
   }
   
   func configure(for user: UserModel) {
      nameTextField.text = user.name
   }
   
   var name: String? {
      return nameTextField.text
   }

   override func willMove(toSuperview newSuperview: UIView!) {
      configure()
   }
   
   private  func configure() {
      nameTitleLabel.text = "Your Name".localized
      nameTitleLabel.textColor = GlobalColors.kBrandNavBarColor
   }
   
   override func awakeFromNib() {
      configure()
   }
   
   
}
