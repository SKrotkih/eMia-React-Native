//
//  PhotoPostViewController.swift
//  eMia
//
//  Created by Sergey Krotkih on 1/21/18.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

import UIKit

class PhotoPostViewController: UIViewController {

   @IBOutlet weak var imageView: UIImageView!
   public var image: UIImage? = nil

   override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

   override func viewWillAppear(_ animated: Bool) {
      super.viewWillAppear(animated)
      imageView.image = image
   }
   
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
