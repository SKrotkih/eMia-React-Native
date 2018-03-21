//
//  EditProfileViewController.swift
//  eMia
//

import UIKit
import NVActivityIndicatorView

protocol LocationComputing {
   func calculateWhereAmI()
}

class EditProfileViewController: UIViewController {

   internal struct CellName {
      static let register3ViewCell = "Register3ViewCell"
      static let register4ViewCell = "Register4ViewCell"
      static let register5ViewCell = "Register5ViewCell"
      static let register6ViewCell = "Register6ViewCell"
      static let register7ViewCell = "Register7ViewCell"
   }

   internal struct CellHeight {
      static let name: CGFloat = 68.0
      static let address: CGFloat = 146.0
      static let gender: CGFloat = 94.0
      static let yaarBirth: CGFloat = 146.0
      static let photo: CGFloat = 291.0
   }

   fileprivate var nameCell: Register7ViewCell!
   fileprivate var addressCell: Register3ViewCell!
   fileprivate var genderCell: Register4ViewCell!
   fileprivate var yearBirthCell: Register5ViewCell!
   fileprivate var photoCell: Register6ViewCell!
   
   fileprivate var locationManager: LocationManager!
   
   var loginInteractor = LoginInteractor()
   var user: UserModel!
   var password: String!
   
   fileprivate var registerUser: Bool!
   
   @IBOutlet weak var signUpButton: UIButton!
   @IBOutlet weak var activityIndicator: NVActivityIndicatorView!
   
   override func viewDidLoad() {
      super.viewDidLoad()
      registerUser = user.userId.isEmpty
      navigationItem.title = registerUser ? "Sign Up".localized : "My Profile".localized
      
      locationManager = LocationManager()
      
      configure(signUpButton)
   }
   
   override func didReceiveMemoryWarning() {
      super.didReceiveMemoryWarning()
      // Dispose of any resources that can be recreated.
   }
   
   @IBAction func backButtonPressed(_ sender: Any) {
      closeWindow()
   }
   
   @IBAction func signUpButtonPressed(_ sender: Any) {
      saveData()
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case signUpButton:
         signUpButton.layer.cornerRadius = signUpButton.frame.height / 2.0
         signUpButton.backgroundColor = GlobalColors.kBrandNavBarColor
      default:
         break
      }
   }
   
}

// MARK: - UITableView delegate protocol

extension EditProfileViewController: UITableViewDelegate, UITableViewDataSource {
   
   public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
      return 5
   }

   public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
      switch indexPath.row {
      case 0:
         return CellHeight.name
      case 1:
         return CellHeight.address
      case 2:
         return CellHeight.gender
      case 3:
         return CellHeight.yaarBirth
      case 4:
         return CellHeight.photo
      default:
         return 0.0
      }
   }
   
   public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      let row = indexPath.row
      switch row {
      case 0:
         nameCell = tableView.dequeueReusableCell(withIdentifier: CellName.register7ViewCell) as! Register7ViewCell
         nameCell.configure(for: user)
         return nameCell
      case 1:
         addressCell = tableView.dequeueReusableCell(withIdentifier: CellName.register3ViewCell) as! Register3ViewCell
         addressCell.configure(for: user, delegate: self)
         return addressCell
      case 2:
         genderCell = tableView.dequeueReusableCell(withIdentifier: CellName.register4ViewCell) as! Register4ViewCell
         genderCell.configure(for: user)
         return genderCell
      case 3:
         yearBirthCell = tableView.dequeueReusableCell(withIdentifier: CellName.register5ViewCell) as! Register5ViewCell
         yearBirthCell.configure(for: user)
         return yearBirthCell

      case 4:
         photoCell = tableView.dequeueReusableCell(withIdentifier: CellName.register6ViewCell) as! Register6ViewCell
         photoCell.viewController = self
         photoCell.configure(for: user)
         return photoCell

      default:
         let cell = UITableViewCell()
         return cell
      }
   }
}

// MARK: -

extension EditProfileViewController {
   
   fileprivate func saveData() {
      guard let name = nameCell.name, name.isEmpty == false else {
         Alert.default.showOk("", message: "Please enter your name".localized)
         return
      }
      guard let image = photoCell.photo else {
         Alert.default.showOk("", message: "Please add photo".localized)
         return
      }
      user.name = name
      user.address = addressCell.address ?? ""
      user.gender = genderCell.gender
      user.yearbirth = yearBirthCell.yearBirth ?? -1
      if self.registerUser {
         user.tokenIOS = DeviceTokenController.myDeviceTokens.first
      }
      if self.registerUser {
         self.activityIndicator.startAnimating()
         loginInteractor.signUp(user: self.user, password: self.password) { user in
            self.activityIndicator.stopAnimating()
            if let user = user {
               let avatarFileName = user.userId
               self.activityIndicator.startAnimating()
               PhotosManager.uploadPhoto(image, for: avatarFileName) { success in
                  self.activityIndicator.stopAnimating()
                  if success {
                     presentMainScreen()
                  } else {
                     Alert.default.showOk("We can't upload photo on server".localized, message: "Please try it later".localized)
                  }
               }
            } else {
               Alert.default.showOk("We can't register your profile".localized, message: "Please check your email address".localized)
            }
         }
      } else {
         self.activityIndicator.startAnimating()
         self.user.synchronize() { success in
            self.activityIndicator.stopAnimating()
            if success {
               let avatarFileName = self.user.userId
               self.activityIndicator.startAnimating()
               PhotosManager.uploadPhoto(image, for: avatarFileName) { success in
                  self.activityIndicator.stopAnimating()
                  if success {
                     PhotosManager.cleanPhotoCache(for: self.user)
                     self.closeWindow()
                  } else {
                     Alert.default.showOk("We can't upload photo on server".localized, message: "Please try it later".localized)
                  }
               }
            } else {
               Alert.default.showOk("We can't save data".localized, message: "Please try it later".localized)
            }
         }
      }
   }
}

// MARK: - Where Am I button pressed

extension EditProfileViewController: LocationComputing {

   func calculateWhereAmI() {
      setUpMunicipalityAccordingMyLocation()
   }
}

// MARK: - Private methods

extension EditProfileViewController {

   fileprivate func setUpMunicipalityAccordingMyLocation() {
      activityIndicator.startAnimating()
      locationManager.requestLocation { location in
         self.activityIndicator.stopAnimating()
         if let myLocation = location {
            // TODO: Use the location for computing user's municipality
            print(myLocation)
         }
      }
   }
   
   fileprivate func closeWindow() {
      navigationController?.popViewController(animated: true)
   }
}
