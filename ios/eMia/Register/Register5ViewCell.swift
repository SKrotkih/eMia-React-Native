//
//  Register5ViewCell.swift
//  eMia
//

import UIKit

// Comment table item

class Register5ViewCell: UITableViewCell, ForUserConfigurable {

   @IBOutlet weak var yearBirthTitleLabel: UILabel!
   @IBOutlet weak var yearPickerView: UIPickerView!

   fileprivate var _yearBirth: Int?
   
   var yearBirth: Int? {
      return _yearBirth
   }
   
   var pickerData = [Int]()
   
   override func awakeFromNib() {
      yearBirthTitleLabel.text = "Year birth".localized

      configure(yearBirthTitleLabel)
      configure(yearPickerView)
   }

   func configure(for user: UserModel) {
      guard let year = user.yearbirth else {
         return
      }
      if let row = pickerData.index(of: year) {
         _yearBirth = pickerData[row]
         yearPickerView.selectRow(row, inComponent: 0, animated: false)
      }
   }

   private func configure(_ view: UIView) {
      switch view {
      case yearPickerView:
         yearPickerView.delegate = self
         yearPickerView.dataSource = self
         
         yearPickerView.tintColor = GlobalColors.kBrandNavBarColor
         
         for i in (1900...2006).reversed()  {
            pickerData.append(i)
         }
      case yearBirthTitleLabel:
         yearBirthTitleLabel.textColor = GlobalColors.kBrandNavBarColor
      default:
         break
      }
   }
}

extension Register5ViewCell: UIPickerViewDelegate, UIPickerViewDataSource {
   
   func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
      return pickerData.count
   }
   
   func numberOfComponents(in pickerView: UIPickerView) -> Int {
      return 1
   }
   
   // The number of columns of data
   func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
      return 1
   }
   
   // The data to return for the row and component (column) that's being passed in
   func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
      return String(pickerData[row])
   }
   
   func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
      _yearBirth = pickerData[row]
   }
   
}
