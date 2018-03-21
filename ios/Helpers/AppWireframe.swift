//
//  Helpers.swift
//  eMia
//

import UIKit

func presentLoginScreen() {
   let appDelegate = UIApplication.shared.delegate as! AppDelegate
   appDelegate.appRouter.presentLoginScreen()
}

func presentMainScreen() {
   let appDelegate = UIApplication.shared.delegate as! AppDelegate
   appDelegate.appRouter.presentMainScreen()
}

func gotoCustomerSite() {
   if let url = URL(string: "http://www.coded.dk") {
      UIApplication.shared.open(url, options: [:])
   }
}

func gotoOurSite() {
   if let url = URL(string: "http://www.coded.dk") {
      UIApplication.shared.open(url, options: [:])
   }
}
