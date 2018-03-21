//
//  NewPost3ViewCell.swift
//  eMia
//

import UIKit

class NewPost3ViewCell: UITableViewCell {

   @IBOutlet weak var addPhotoButton: UIButton!
   @IBOutlet weak var photoImageView: UIImageView!
   
   var viewController: UIViewController!
   
   fileprivate var _imageViewController: SFFullscreenImageDetailViewController?
   fileprivate let imagePicker = UIImagePickerController()
   
   override func awakeFromNib() {
      configure(addPhotoButton)
      configure(photoImageView)
   }

   private func configure(_ view: UIView) {
      switch view {
      case addPhotoButton:
         addPhotoButton.setTitleColor(GlobalColors.kBrandNavBarColor, for: .normal)
         addPhotoButton.setTitle("Add Photo".localized, for: .normal)
      case photoImageView:
         photoImageView.isUserInteractionEnabled = true
         let tap = UITapGestureRecognizer(target: self, action: #selector(self.didPressImageView(_:)))
         photoImageView.addGestureRecognizer(tap)

      default:
         break
      }
   }
   
   @IBAction func addButtonPressed(_ sender: Any) {
      addPhoto()
   }

   @objc func didPressImageView(_ recognizer: UITapGestureRecognizer) {
      guard let _ = photoImage else {
         return
      }
      _imageViewController = SFFullscreenImageDetailViewController(imageView: photoImageView)
      _imageViewController?.presentInCurrentKeyWindow()
   }
   
   var photoImage: UIImage? {
      return photoImageView.image
   }
}

extension NewPost3ViewCell: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
   
   fileprivate func addPhoto() {
      
      let title = self.viewController()?.navigationItem.title
      let alertVC = UIAlertController(title: title, message: nil, preferredStyle: .actionSheet)
      alertVC.addAction(UIAlertAction(title: "Camera".localized, style: .default, handler: { _ in
         self.openCamera()
      }))
      
      alertVC.addAction(UIAlertAction(title: "Gallary".localized, style: .default, handler: { _ in
         self.openGallary()
      }))
      
      alertVC.addAction(UIAlertAction(title: "Cancel".localized, style: .cancel, handler: nil))
      
      self.viewController()?.present(alertVC, animated: true, completion: nil)
   }
   
   fileprivate func openCamera() {
      if(UIImagePickerController .isSourceTypeAvailable(UIImagePickerControllerSourceType.camera))
      {
         imagePicker.delegate = self
         imagePicker.allowsEditing = true
         imagePicker.sourceType = .camera
         self.viewController.present(imagePicker, animated: true, completion: nil)
      }
      else
      {
         Alert.default.showOk("Warning".localized, message: "You don't have a camera".localized)
      }
   }
   
   fileprivate func openGallary()
   {
      imagePicker.delegate = self
      imagePicker.allowsEditing = true
      imagePicker.sourceType = .photoLibrary
      self.viewController.present(imagePicker, animated: true, completion: nil)
   }
   
   func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
      if let pickedImage = info[UIImagePickerControllerEditedImage] as? UIImage {
         var image: UIImage
         if let fixedImage =  pickedImage.fitToSize() {
            image = fixedImage
         } else {
            image = pickedImage
         }
         photoImageView.image = image
      }
      self.viewController.dismiss(animated: true, completion: nil)
   }
   
   func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
      self.viewController.dismiss(animated: true, completion: nil)
   }
}
