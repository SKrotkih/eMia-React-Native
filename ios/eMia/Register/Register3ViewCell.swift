//
//  Register3ViewCell.swift
//  eMia
//

import UIKit

// Static text, Date, Send Email button

class Register3ViewCell: UITableViewCell {
   
   @IBOutlet weak var addressTitleLabel: UILabel!
   @IBOutlet weak var pickerView: UIPickerView!
   @IBOutlet weak var whereAmIButton: UIButton!
   
   var delegate: LocationComputing!
   private var municipalityPicker: MunicipalityPicker!
   
   override func awakeFromNib() {
      configure(addressTitleLabel)
//      configure(whereAmIButton)
      municipalityPicker = MunicipalityPicker(pickerView: pickerView)
   }

   @IBAction func whereAmIButtonPressed(_ sender: Any) {
      delegate.calculateWhereAmI()
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case addressTitleLabel:
         addressTitleLabel.text = "Choose your municipality".localized
         addressTitleLabel.textColor = GlobalColors.kBrandNavBarColor
      case whereAmIButton:
         whereAmIButton.setTitleColor(GlobalColors.kBrandNavBarColor, for: .normal)
      default:
         break
      }
   }

   func configure(for user: UserModel, delegate: LocationComputing) {
      self.delegate = delegate
      municipalityPicker.configure(for: user)
   }
   
   var address: String? {
      return municipalityPicker.municipality?.0
   }
}
