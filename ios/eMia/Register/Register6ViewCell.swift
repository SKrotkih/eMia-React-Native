//
//  Register6ViewCell.swift
//  eMia
//

import UIKit

class Register6ViewCell: UITableViewCell, ForUserConfigurable {
   
   @IBOutlet weak var addPhotoButton: UIButton!
   @IBOutlet weak var photoImageView: UIImageView!

   var viewController: UIViewController!
   
   fileprivate var _imageViewController: SFFullscreenImageDetailViewController?
   fileprivate let imagePicker = UIImagePickerController()

   var photo: UIImage? {
      return photoImageView.image
   }
   
   override func awakeFromNib() {
      configure(addPhotoButton)
      configure(photoImageView)
   }
   
   fileprivate func setUpPhoto(_ image: UIImage?) {
      self.photoImageView.image = image
      if image == nil {
         self.addPhotoButton.setTitle("Add photo".localized, for: .normal)
      } else {
         self.addPhotoButton.setTitle("Change photo".localized, for: .normal)
      }
   }
   
   func configure(for user: UserModel) {
      guard !user.userId.isEmpty else {
         return
      }
      PhotosManager.downloadAvatar(for: user.userId) { image in
         self.setUpPhoto(image)
      }
   }

   @IBAction func addPhotoButtonPressed(_ sender: Any) {
      addPhoto()
   }

   @objc func didPressImageView(_ recognizer: UITapGestureRecognizer) {
      _imageViewController = SFFullscreenImageDetailViewController(imageView: photoImageView)
      _imageViewController?.presentInCurrentKeyWindow()
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case addPhotoButton:
         addPhotoButton.setTitle("Add photo".localized, for: .normal)
         addPhotoButton.setTitleColor(GlobalColors.kBrandNavBarColor, for: .normal)

      case photoImageView:
         photoImageView.isUserInteractionEnabled = true
         let tap = UITapGestureRecognizer(target: self, action: #selector(self.didPressImageView(_:)))
         photoImageView.addGestureRecognizer(tap)
      default:
         break
      }
   }
}

// MARK: - ADD PHOTO

extension Register6ViewCell: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
   
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
         var photo: UIImage
         if let image =  pickedImage.fitToSize() {
            photo = image
         } else {
            photo = pickedImage
         }
         self.setUpPhoto(photo)
      }
      self.viewController.dismiss(animated: true, completion: nil)
   }
   
   func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
      self.viewController.dismiss(animated: true, completion: nil)
   }
}
