//
//  SettingsViewController.swift
//  eMia
//
//  Created by Sergey Krotkih on 12/20/17.
//  Copyright © 2017 Coded I/S. All rights reserved.
//

import UIKit

class SettingsViewController: UIViewController {

   internal struct CellName {
      static let myProfile1ViewCell = "MyProfile1ViewCell"
      static let myProfile2ViewCell = "MyProfile2ViewCell"
   }
   
   struct Segue {
      static let editProfileViewController = "registerSegue"
   }
   @IBOutlet weak var tableView: UITableView!
   
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

   override func viewWillAppear(_ animated: Bool) {
      super.viewWillAppear(animated)
      tableView.reloadData()
   }
   
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
   @IBAction func backButtonPressed(_ sender: Any) {
      navigationController?.popViewController(animated: true)
   }
   
   override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
      if let editProfileViewController = segue.destination as? EditProfileViewController {
         if let currentUser = UsersManager.currentUser {
            editProfileViewController.user = currentUser
         }
      }
   }
}

// MARK: - Table View delegate protocol

extension SettingsViewController: UITableViewDelegate, UITableViewDataSource {
   public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
      return 3
   }
   
   public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
      switch indexPath.row {
      case 0:
         // User profile editor cell
         return 64.0
      case 1:
         // Go to site
         return 52.0
      case 2:
         // Log Out
         return 52.0
      default:
         return 0.0
      }
   }
   
   public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      switch indexPath.row {
      case 0:
         let cell1 = tableView.dequeueReusableCell(withIdentifier: CellName.myProfile1ViewCell) as! MyProfile1ViewCell
         cell1.configure()
         return cell1
      case 1:
         let cell2 = tableView.dequeueReusableCell(withIdentifier: CellName.myProfile2ViewCell) as! MyProfile2ViewCell
         cell2.titleLabel.text = "Visit to the app site".localized
         return cell2
      case 2:
         let cell3 = tableView.dequeueReusableCell(withIdentifier: CellName.myProfile2ViewCell) as! MyProfile2ViewCell
         cell3.titleLabel.text = "Log Out".localized
         return cell3
      default:
         let cell = UITableViewCell()
         return cell
      }
   }
   
   public func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
      tableView.deselectRow(at: indexPath, animated: false)
      switch indexPath.row {
      case 0:
         if let _ = UsersManager.currentUser {
            performSegue(withIdentifier: SettingsViewController.Segue.editProfileViewController, sender: self)
         }
      case 1:
         gotoCustomerSite()
      case 2:
         UsersManager.logOut()
      default:
         break
      }
   }
}
