//
//  PopUpReachabilityView.swift
//  KMApp
//

import UIKit
import RxSwift

class PopUpReachabilityView: UIView {
    
    @IBOutlet weak var textLabel: UILabel!
    @IBOutlet weak var settingsButton: UIButton!

    private let disposeBag = DisposeBag()
    
    override func awakeFromNib() {
        textLabel.text = "No Internet Connection\nPlease check the Internet Connection"
        self.backgroundColor = #colorLiteral(red: 0.1080000028, green: 0.2319999933, blue: 0.3619999886, alpha: 1)
        setUpSettingsButton()
    }

    private func setUpSettingsButton() {
        settingsButton.rx
            .tap
         .debounce(.milliseconds(300), scheduler: MainScheduler.instance)
            .subscribe(onNext:{
                // Utils.openSettings() { _ in }
            })
            .disposed(by: disposeBag)
    }
    

    static func show() {
      DispatchQueue.main.async {
         let rootVC =  (UIApplication.shared.delegate as? AppDelegate)?.mainNavController()
         if let subView = rootVC?.view {
            let xibName = "PopUpReachabilityView"
            if let view = Bundle.main.loadNibNamed(xibName, owner: rootVC, options: nil)?[0] as? PopUpReachabilityView {
               var frame = CGRect(x: 0.0, y: subView.frame.height, width: subView.frame.width, height: view.frame.height)
               view.frame = frame
               subView.addSubview(view)
               UIView.animate(withDuration: 0.3, delay: 0, options: .beginFromCurrentState, animations: {() -> Void in
                  frame.origin.y = subView.frame.height - view.frame.height
                  view.frame = frame
               }, completion: { _ in
               })
               runAfterDelay(4) {
                  // Hide after 4 seconds
                  UIView.animate(withDuration: 0.3, delay: 0, options: .beginFromCurrentState, animations: {() -> Void in
                     frame.origin.y = subView.frame.height
                     view.frame = frame
                  }, completion: { _ in
                     view.removeFromSuperview()
                  })
               }
            }
         }
        }
    }
}
