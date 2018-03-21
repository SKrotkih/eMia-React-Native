//
//  Alert.swift
//  eMia
//

import UIKit


final class Alert {
   
   static let `default` = Alert()
   
   var popupWindow : UIWindow!
   var rootVC : UIViewController!
   
   fileprivate init() {
      let screenBounds = UIScreen.main.bounds
      popupWindow = UIWindow(frame: CGRect(x: 0, y: 0, width: screenBounds.width, height: screenBounds.height))
      popupWindow.windowLevel = UIWindowLevelStatusBar + 1
      
      rootVC = StatusBarShowingViewController()
      popupWindow.rootViewController = rootVC
      
   }

   func showButton(_ title: String, message: String, buttonTitle: String, onComplete: @escaping ()->Void = {  }) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         alert.addAction(UIAlertAction(title: buttonTitle, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onComplete()
         }))
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   
   func showOk(_ title: String, message: String, onComplete: @escaping ()->Void = {  }) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onComplete()
         }))
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
	
	func showError(_ title: String = "Error".localized, message: String, onComplete: @escaping ()->Void = {  }) {
		DispatchQueue.main.async {
			self.popupWindow.isHidden = false
			let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
			alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: { _ in
				self.resignPopupWindow()
				onComplete()
			}))
			self.rootVC.present(alert, animated: true, completion: nil)
		}
	}
	
   func showOkCancel(_ title: String, message: String, onComplete: (()->Void)?, onCancel: (()->Void)?) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         let okAction = UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onComplete?()
         })
         let cancelAction = UIAlertAction(title: "Cancel".localized, style: UIAlertActionStyle.cancel, handler: { _ in
            self.resignPopupWindow()
            onCancel?()
         })
         alert.addAction(cancelAction)
         alert.addAction(okAction)
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   func showYesNo(_ title: String, message: String, onYes: @escaping ()->Void = {}, onNo: @escaping ()->Void = {}) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         let okAction = UIAlertAction(title: "Yes".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onYes()
         })
         let cancelAction = UIAlertAction(title: "No".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onNo()
         })
         alert.addAction(cancelAction)
         alert.addAction(okAction)
         
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   func showConfirmCancel(_ title: String, message: String, onConfirm: @escaping ()->Void = {}, onCancel: @escaping ()->Void = {}) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         let okAction = UIAlertAction(title: "Confirm".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onConfirm()
         })
         let cancelAction = UIAlertAction(title: "Cancel".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onCancel()
         })
         alert.addAction(cancelAction)
         alert.addAction(okAction)
         
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   func showConfirmChange(_ title: String, message: String, onConfirm: @escaping ()->Void = {}, onChange: @escaping ()->Void = {}) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         let okAction = UIAlertAction(title: "Confirm".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onConfirm()
         })
         let cancelAction = UIAlertAction(title: "Change".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onChange()
         })
         alert.addAction(cancelAction)
         alert.addAction(okAction)
         
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   func showOkChange(_ title: String, message: String, onOk: @escaping ()->Void = {}, onChange: @escaping ()->Void = {}) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         let okAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onOk()
         })
         let cancelAction = UIAlertAction(title: "Change".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onChange()
         })
         alert.addAction(cancelAction)
         alert.addAction(okAction)
         
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   func showSettingsCancel(_ title: String, message: String, onSettings: @escaping ()->Void = {}, onCancel: @escaping ()->Void = {}) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         let settingsAction = UIAlertAction(title: "Settings".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onSettings()
         })
         let cancelAction = UIAlertAction(title: "Cancel".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
         })
         alert.addAction(settingsAction)
         alert.addAction(cancelAction)
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   func showOkNo(_ title: String, message: String, onOk: @escaping ()->Void = {}, onNo: @escaping ()->Void = {}) {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = false
         let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
         let letsGoAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onOk()
         })
         let laterAction = UIAlertAction(title: "No".localized, style: UIAlertActionStyle.default, handler: { _ in
            self.resignPopupWindow()
            onNo()
         })
         alert.addAction(laterAction)
         alert.addAction(letsGoAction)
         
         self.rootVC.present(alert, animated: true, completion: nil)
      }
   }
   
   func resignPopupWindow() {
      DispatchQueue.main.async {
         self.popupWindow.isHidden = true
      }
   }
   
}

final class StatusBarShowingViewController: UIViewController {
	override var prefersStatusBarHidden : Bool {
		return false
	}
}
