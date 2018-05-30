//
//  MunicipalityControllerView.swift
//  eMia
//
//  Created by Сергей Кротких on 20/05/2018.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit
import RxSwift
import RxCocoa

class MunicipalityControllerView: UIView {
   
   private var municipalityPicker: MunicipalityPicker!
   
   @IBOutlet weak var municipalityPickerView: UIPickerView!
   
   @IBOutlet weak var municipalityBackgroundView: UIView!
   
   @IBOutlet weak var selectAllMunicipalityView: UIView!
   @IBOutlet weak var selectMunicipalityView: UIView!
   @IBOutlet weak var allMunicipalityLabel: UILabel!
   @IBOutlet weak var selectMunicipalityLabel: UILabel!

   @IBOutlet var tapAllRecognizer: UITapGestureRecognizer!
   @IBOutlet var tapMunicipalityRecognizer: UITapGestureRecognizer!
   
   private var labelsColor: UIColor!

   private var municipality: String? {
      return municipalityPicker.municipality?.0
   }
    private var selectedMunicipality: (String,String)?
   
   var municipalityFilter = Variable<String>("")
   private let disposeBug = DisposeBag()
   
   fileprivate struct Constants {
      static let cornerRadius: CGFloat = 3.0
      static let borderWidth: CGFloat = 2.0
   }

   static func getInstance(for superView: UIView) -> MunicipalityControllerView {
      let view = UIView.loadFrom(nibNamed: "MunicipalityControllerView") as! MunicipalityControllerView
      view.frame = superView.bounds
      view.autoresizingMask = [.flexibleHeight, .flexibleWidth]
      superView.addSubview(view)
      return view
   }
   
   override func awakeFromNib() {
      super.awakeFromNib()
      
      configureView()
      setUpMunicipalityValue()
      setUpLocalObserver()
   }
   
   private func configureView() {
      municipalityPicker = MunicipalityPicker(pickerView: municipalityPickerView)
      
      municipalityBackgroundView.layer.cornerRadius = Constants.cornerRadius
      municipalityBackgroundView.layer.borderWidth = Constants.borderWidth
      municipalityBackgroundView.layer.borderColor = UIColor.lightGray.cgColor
      
      selectAllMunicipalityView.layer.cornerRadius = Constants.cornerRadius
      selectAllMunicipalityView.layer.borderWidth = Constants.borderWidth
      selectAllMunicipalityView.layer.borderColor = UIColor.clear.cgColor

      selectMunicipalityView.layer.cornerRadius = Constants.cornerRadius
      selectMunicipalityView.layer.borderWidth = Constants.borderWidth
      selectMunicipalityView.layer.borderColor = UIColor.clear.cgColor
      
      self.allMunicipalityLabel.text = "All".localized
      
      labelsColor = self.allMunicipalityLabel.textColor
      
      tapAllRecognizer.rx.event.subscribe({[weak self] _ in
         guard let `self` = self else { return }
         self.municipalityFilter.value = ""
      }).disposed(by: disposeBug)

      tapMunicipalityRecognizer.rx.event.subscribe({[weak self] _ in
         guard let `self` = self else { return }
         if let selectedMunicipality = self.selectedMunicipality {
            let currentMunicipalityId = selectedMunicipality.0
            self.municipalityFilter.value = currentMunicipalityId
         } else {
            self.municipalityFilter.value = ""
         }
      }).disposed(by: disposeBug)
   }

   private func setUpMunicipalityValue() {
      municipalityPicker.didSelectMunicipality = { [weak self] municipality in
         guard let `self` = self else { return }
         self.selectedMunicipality = municipality
         if let municipality = municipality {
            self.selectMunicipalityLabel.text = municipality.1
            self.municipalityFilter.value = municipality.0
         }
      }
      if self.municipalityFilter.value.count > 0 {
         municipalityPicker.select(self.municipalityFilter.value)
      }
   }
   
   private func setUpLocalObserver() {
      _ = municipalityFilter.asObservable().subscribe { [weak self] municipalityId in
         guard let `self` = self else { return }
         guard let municipalityId = municipalityId.element else {
            return
         }
         self.selectMunicipalityLabel.text = self.municipalityPicker.getName(for: municipalityId)
         
         self.selectAllMunicipalityView.layer.borderColor = UIColor.clear.cgColor
         self.selectMunicipalityView.layer.borderColor = UIColor.clear.cgColor
         
         self.allMunicipalityLabel.textColor = self.labelsColor
         self.allMunicipalityLabel.font = GlobalFonts.kAvenirBook
         self.selectMunicipalityLabel.textColor = self.labelsColor
         self.selectMunicipalityLabel.font = GlobalFonts.kAvenirBook
         
         if municipalityId.isEmpty {
            self.allMunicipalityLabel.textColor = GlobalColors.kBrandNavBarColor
            self.allMunicipalityLabel.font = GlobalFonts.kAvenirBold
            self.selectAllMunicipalityView.layer.borderColor = GlobalColors.kBrandNavBarColor.cgColor
         } else {
            self.selectMunicipalityLabel.textColor = GlobalColors.kBrandNavBarColor
            self.selectMunicipalityLabel.font = GlobalFonts.kAvenirBold
            self.selectMunicipalityView.layer.borderColor = GlobalColors.kBrandNavBarColor.cgColor
         }
      }
   }
}
