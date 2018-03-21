//
//  RegisterViewController.swift
//  eMia
//

import UIKit
import NVActivityIndicatorView

class RegisterViewController: UIViewController {

   internal struct CellName {
      static let register1ViewCell = "Register1ViewCell"
      static let register2ViewCell = "Register2ViewCell"
      static let register3ViewCell = "Register3ViewCell"
      static let register4ViewCell = "Register4ViewCell"
      static let register5ViewCell = "Register5ViewCell"
      static let register6ViewCell = "Register6ViewCell"
      static let register7ViewCell = "Register7ViewCell"
   }

   internal struct CellHeight {
      static let email: CGFloat = 64.0
      static let password: CGFloat = 64.0
      static let name: CGFloat = 68.0
      static let address: CGFloat = 146.0
      static let gender: CGFloat = 94.0
      static let yaarBirth: CGFloat = 146.0
      static let photo: CGFloat = 291.0
   }
   
   // Specific for registering a new user
   fileprivate var emailCell: Register1ViewCell!
   fileprivate var passwordCell: Register2ViewCell!

   fileprivate var nameCell: Register7ViewCell!
   fileprivate var addressCell: Register3ViewCell!
   fileprivate var genderCell: Register4ViewCell!
   fileprivate var yearBirthCell: Register5ViewCell!
   fileprivate var photoCell: Register6ViewCell!

   fileprivate var locationManager: LocationManager!
   var user: UserModel!
   var password: String?
   
   @IBOutlet weak var signUpButton: UIButton!
   @IBOutlet weak var activityIndicator: NVActivityIndicatorView!
   
   override func viewDidLoad() {
      super.viewDidLoad()
      
      navigationItem.title = "Sign Up".localized

      locationManager = LocationManager()
      user = UserModel()
      
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
      registerNewUser()
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

extension RegisterViewController: UITableViewDelegate, UITableViewDataSource {
   
   public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
      return 7
   }

   public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
      switch indexPath.row {
      case 0:
         return CellHeight.email
      case 1:
         return CellHeight.password
      case 2:
         return CellHeight.name
      case 3:
         return CellHeight.address
      case 4:
         return CellHeight.gender
      case 5:
         return CellHeight.yaarBirth
      case 6:
         return CellHeight.photo
      default:
         return 0.0
      }
   }
   
   public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      let row = indexPath.row
      switch row {
      case 0:
         emailCell = tableView.dequeueReusableCell(withIdentifier: CellName.register1ViewCell) as! Register1ViewCell
         return emailCell
      case 1:
         passwordCell = tableView.dequeueReusableCell(withIdentifier: CellName.register2ViewCell) as! Register2ViewCell
         passwordCell.password = password
         return passwordCell
      case 2:
         nameCell = tableView.dequeueReusableCell(withIdentifier: CellName.register7ViewCell) as! Register7ViewCell
         nameCell.configure(for: user)
         return nameCell
      case 3:
         addressCell = tableView.dequeueReusableCell(withIdentifier: CellName.register3ViewCell) as! Register3ViewCell
         addressCell.configure(for: user, delegate: self)
         return addressCell
      case 4:
         genderCell = tableView.dequeueReusableCell(withIdentifier: CellName.register4ViewCell) as! Register4ViewCell
         genderCell.configure(for: user)
         return genderCell
      case 5:
         yearBirthCell = tableView.dequeueReusableCell(withIdentifier: CellName.register5ViewCell) as! Register5ViewCell
         yearBirthCell.configure(for: user)
         return yearBirthCell

      case 6:
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

// MARK: - Register new user

extension RegisterViewController {
   
   fileprivate func registerNewUser() {
      guard let email = emailCell.email, email.isValidEmail() else {
         Alert.default.showOk("", message: "Please enter your email address".localized)
         return
      }
      guard let password = passwordCell.password, password.count > 6 else {
         Alert.default.showOk("", message: "Please enter password (more than 6 characters)".localized)
         return
      }
      guard let name = nameCell.name, name.isEmpty == false else {
         Alert.default.showOk("", message: "Please enter name".localized)
         return
      }
      guard let image = photoCell.photo else {
         Alert.default.showOk("", message: "Please add photo".localized)
         return
      }
      let address = addressCell.address ?? ""
      let gender = genderCell.gender
      let yearBirth = yearBirthCell.yearBirth ?? -1
      UsersManager.signUp(name: name, email: email, password: password, address: address, gender: gender, yearbirth: yearBirth) { user in
         if let user = user {
            PhotosManager.uploadPhoto(image, for: user.userId) { success in
               if success == false {
                  Alert.default.showOk("We can't upload photo on server".localized, message: "Please try it later".localized)
               }
            }
            presentMainScreen()
         } else {
            Alert.default.showOk("We can't register your profile".localized, message: "Please check your email address".localized)
         }
      }
   }
}

// MARK: - Where Am I button pressed

extension RegisterViewController: LocationComputing {
   
   func calculateWhereAmI() {
      setUpMunicipalityAccordingMyLocation()
   }
}

// MARK: - Private methods

extension RegisterViewController {

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
