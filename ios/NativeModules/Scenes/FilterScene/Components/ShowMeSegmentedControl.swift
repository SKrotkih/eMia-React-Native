//
//  ShowMeSegmentedControl.swift
//  eMia
//
//  Created by Сергей Кротких on 20/05/2018.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit
import RxSwift
import RxCocoa

class ShowMeSegmentedControl: UIView {
   
   @IBOutlet weak var selectedGuysView: UIView!
   @IBOutlet weak var selectedGirlsView: UIView!
   @IBOutlet weak var selectedBothView: UIView!
   
   @IBOutlet weak var guysLabel: UILabel!
   @IBOutlet weak var girlsLabel: UILabel!
   @IBOutlet weak var bothLabel: UILabel!
   
   @IBOutlet var tapGuysRecognizer: UITapGestureRecognizer!
   @IBOutlet var tapGirlsRecognizer: UITapGestureRecognizer!
   @IBOutlet var tapBothRecognizer: UITapGestureRecognizer!
   
   private var labelsColor: UIColor!
   
   var genderFilter = Variable<Gender>(.both)
   private let disposeBug = DisposeBag()
   
   fileprivate struct Constants {
      static let cornerRadius: CGFloat = 3.0
      static let borderWidth: CGFloat = 2.0
   }
   
   static func getInstance(for superView: UIView) -> ShowMeSegmentedControl {
      let view = UIView.loadFrom(nibNamed: "ShowMeSegmentedControl") as! ShowMeSegmentedControl
      view.frame = superView.bounds
      view.autoresizingMask = [.flexibleHeight, .flexibleWidth]
      superView.addSubview(view)
      return view
   }
   
   override func awakeFromNib() {
      super.awakeFromNib()
      
      configureView()
      setUpLocalObserver()
   }
   
   private func configureView() {
      guysLabel.text = "Guys".localized
      girlsLabel.text = "Girls".localized
      bothLabel.text = "Both".localized
      selectedGuysView.layer.cornerRadius = Constants.cornerRadius
      selectedGuysView.layer.borderWidth = Constants.borderWidth
      selectedGirlsView.layer.cornerRadius = Constants.cornerRadius
      selectedGirlsView.layer.borderWidth = Constants.borderWidth
      selectedBothView.layer.cornerRadius = Constants.cornerRadius
      selectedBothView.layer.borderWidth = Constants.borderWidth

      labelsColor = guysLabel.textColor
      
      tapGuysRecognizer.rx.event.subscribe({[weak self] _ in
         guard let `self` = self else { return }
         self.genderFilter.value = .boy
      }).disposed(by: disposeBug)

      tapGirlsRecognizer.rx.event.subscribe({[weak self] _ in
         guard let `self` = self else { return }
         self.genderFilter.value = .girl
      }).disposed(by: disposeBug)

      tapBothRecognizer.rx.event.subscribe({[weak self] _ in
         guard let `self` = self else { return }
         self.genderFilter.value = .both
      }).disposed(by: disposeBug)
   }
   
   private func setUpLocalObserver() {
      _ = genderFilter.asObservable().subscribe { [weak self] lookFor in
         guard let `self` = self else { return }
         guard let genderReq = lookFor.element else {
            return
         }
         
         self.guysLabel.textColor = self.labelsColor
         self.guysLabel.font = GlobalFonts.kAvenirBook
         self.girlsLabel.textColor = self.labelsColor
         self.girlsLabel.font = GlobalFonts.kAvenirBook
         self.bothLabel.textColor = self.labelsColor
         self.bothLabel.font = GlobalFonts.kAvenirBook
         
         self.selectedGuysView.layer.borderColor = UIColor.clear.cgColor
         self.selectedGirlsView.layer.borderColor = UIColor.clear.cgColor
         self.selectedBothView.layer.borderColor = UIColor.clear.cgColor
         
         switch genderReq {
         case .none:   return
         case .boy:
            self.selectedGuysView.layer.borderColor = GlobalColors.kBrandNavBarColor.cgColor
            self.guysLabel.textColor = GlobalColors.kBrandNavBarColor
            self.guysLabel.font = GlobalFonts.kAvenirBold
         case .girl:
            self.selectedGirlsView.layer.borderColor = GlobalColors.kBrandNavBarColor.cgColor
            self.girlsLabel.textColor = GlobalColors.kBrandNavBarColor
            self.girlsLabel.font = GlobalFonts.kAvenirBold
         case .both:
            self.selectedBothView.layer.borderColor = GlobalColors.kBrandNavBarColor.cgColor
            self.bothLabel.textColor = GlobalColors.kBrandNavBarColor
            self.bothLabel.font = GlobalFonts.kAvenirBold
         }
      }
   }
}
