//
//  FiltersViewController.swift
//  eMia
//
//  Created by Сергей Кротких on 25/05/2018.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit

final class FiltersViewController: UIViewController {

    var presenter: FilterPresented!
    
    // MARK: Outlets
    @IBOutlet weak var genderBackgroundView: UIView!
    @IBOutlet weak var myFavoriteBackgroundView: UIView!
    @IBOutlet weak var municipalityBackgroundView: UIView!
    @IBOutlet weak var agesSliderBackgroundView: UIView!
    
    @IBOutlet weak var ageLabel: UILabel!
    @IBOutlet weak var separatorLineView: UIView!
    @IBOutlet weak var municipalityLabel: UILabel!
    
    // MARK: Private
    private struct Constants {
        static let cornerRadius: CGFloat = 3.0
        static let borderWidth: CGFloat = 2.0
    }
    
    // MARK: View life cycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        customize(viewController: self)
        
        FilterDependencies.configure(view: self)
        configureView()
        presenter.configure()
    }
   
   private func customize(viewController: UIViewController) {
      if viewController.parent is UINavigationController {
         // Hides text in back barbutton item
         viewController.navigationController?.navigationItem.backBarButtonItem = UIBarButtonItem(title: " ", style: .plain, target: nil, action: nil)
      }
   }
   
    // MARK: Router
    override func shouldPerformSegue(withIdentifier identifier: String, sender: Any?) -> Bool {
        switch segueType(for: identifier) {
        case .exitToGallery:
            presenter.close()
            return true
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        switch segueType(for: segue) {
        case .exitToGallery:
            break
        }
    }
    
    @IBAction func backBarButtonPressed(_ sender: Any) {
        performSegue(.exitToGallery, sender: nil)
    }
}

// MARK: - Navigation & SegueRawRepresentable protocol

extension FiltersViewController: SegueRawRepresentable {
    
    enum SegueType: String {
        case exitToGallery
    }
}

//    MARK: - Configure Components View

extension FiltersViewController  {
    
    private func configureView() {
        configure(self.view)
        configure(separatorLineView)
        configure(genderBackgroundView)
        configure(myFavoriteBackgroundView)
        configure(municipalityBackgroundView)
        configure(municipalityLabel)
        
        // MARK: Place Components
        presenter.addShowMeComponent(genderBackgroundView)
        presenter.addFavoriteStatusComponent(myFavoriteBackgroundView)
        presenter.addMunicipalityComponent(municipalityBackgroundView)
        presenter.addAggesComponent(agesSliderBackgroundView)
    }

    fileprivate func configure(_ view: UIView) {
        switch view {
        case self.view:
            view.backgroundColor = UIColor.white.withAlphaComponent(0.75)
            let blurEffect = UIBlurEffect(style: UIBlurEffectStyle.extraLight)
            let blurEffectView = UIVisualEffectView(effect: blurEffect)
            blurEffectView.frame = view.bounds
            blurEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            view.insertSubview(blurEffectView, at: 0)
            
        case separatorLineView:
            separatorLineView.backgroundColor = GlobalColors.kBrandNavBarColor
        case municipalityLabel:
            municipalityLabel.text = "Municipality".localized
            
        case ageLabel:
            ageLabel.text = "Age".localized

        // MARK: Add Components
        case genderBackgroundView:
            genderBackgroundView.layer.cornerRadius = Constants.cornerRadius
            genderBackgroundView.layer.borderWidth = Constants.borderWidth
            genderBackgroundView.layer.borderColor = UIColor.lightGray.cgColor
            
        case myFavoriteBackgroundView:
            myFavoriteBackgroundView.layer.cornerRadius = Constants.cornerRadius
            myFavoriteBackgroundView.layer.borderWidth = Constants.borderWidth
            myFavoriteBackgroundView.layer.borderColor = UIColor.lightGray.cgColor
            
        case municipalityBackgroundView:
            break
            
        default: break
        }
    }
}
