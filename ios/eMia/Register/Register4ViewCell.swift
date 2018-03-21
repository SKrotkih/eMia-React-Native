//
//  Register4ViewCell.swift
//  eMia
//

import UIKit

// My profile editor: Gender

class Register4ViewCell: UITableViewCell, ForUserConfigurable {

   @IBOutlet weak var imTitleLabel: UILabel!
   
   @IBOutlet weak var selectedGuyView: UIView!
   @IBOutlet weak var selectedGirlView: UIView!

   @IBOutlet weak var guyLabel: UILabel!
   @IBOutlet weak var girlLabel: UILabel!
   
   @IBOutlet weak var genderBackgroundView: UIView!

   fileprivate var labelsColor: UIColor!

   private var _gender: Gender?
   
   var gender: Gender {
      get {
         return _gender ?? .boy
      }
      set {
         _gender = newValue
      }
   }

   func configure(for user: UserModel) {
      presentSelect(gender: user.gender ?? .boy)
   }
   
   override func awakeFromNib() {
      configure(imTitleLabel)
      configure(genderBackgroundView)
   }

   fileprivate func configure(_ view: UIView) {
      switch view {
      case imTitleLabel:
         imTitleLabel.text = "I'm"
         imTitleLabel.textColor = GlobalColors.kBrandNavBarColor
         
      case genderBackgroundView:
         labelsColor = guyLabel.textColor
         
         genderBackgroundView.layer.cornerRadius = 3.0
         genderBackgroundView.layer.borderWidth = 1.0
         genderBackgroundView.layer.borderColor = UIColor.lightGray.cgColor
         
         let tapGesture1 = UITapGestureRecognizer(target: self, action: #selector(selectedGuy(_:)))
         selectedGuyView.addGestureRecognizer(tapGesture1)
         selectedGuyView.layer.cornerRadius = 3.0
         selectedGuyView.layer.borderWidth = 2.0
         
         let tapGesture2 = UITapGestureRecognizer(target: self, action: #selector(selectedGirl(_:)))
         selectedGirlView.addGestureRecognizer(tapGesture2)
         selectedGirlView.layer.cornerRadius = 3.0
         selectedGirlView.layer.borderWidth = 2.0
         
         presentSelect(gender: self.gender)
         
      default: break
      }
   }
   
   // MARK: Gender Selected Control
   
   @objc func selectedGuy(_ gesture: UITapGestureRecognizer) {
      didSelect(gender: .boy)
      presentSelect(gender: .boy)
   }
   
   @objc func selectedGirl(_ gesture: UITapGestureRecognizer) {
      didSelect(gender: .girl)
      presentSelect(gender: .girl)
   }
   
   func didSelect(gender: Gender) {
      self.gender = gender
   }
   
   func presentSelect(gender: Gender) {
      selectedGuyView.layer.borderColor = UIColor.clear.cgColor
      selectedGirlView.layer.borderColor = UIColor.clear.cgColor
      
      guyLabel.textColor = labelsColor
      guyLabel.font = GlobalFonts.kAvenirBook
      girlLabel.textColor = labelsColor
      girlLabel.font = GlobalFonts.kAvenirBook
      
      switch gender {
      case .none, .both:
         break
      case .boy:
         guyLabel.textColor = GlobalColors.kBrandNavBarColor
         guyLabel.font = GlobalFonts.kAvenirBold
         selectedGuyView.layer.borderColor = GlobalColors.kBrandNavBarColor.cgColor
      case .girl:
         girlLabel.textColor = GlobalColors.kBrandNavBarColor
         girlLabel.font = GlobalFonts.kAvenirBold
         selectedGirlView.layer.borderColor = GlobalColors.kBrandNavBarColor.cgColor
      }
   }
   
}
