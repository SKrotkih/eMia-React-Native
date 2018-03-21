//
//  NewPost1ViewCell.swift
//  eMia
//

import UIKit

class NewPost1ViewCell: UITableViewCell {

   @IBOutlet weak var titleTextField: UITextField!
   
   override func awakeFromNib() {
   }

   func invalidValue() {
      titleTextField.shake()
   }
   
   var titlePostText: String {
      return titleTextField.text ?? ""
   }
   
}
