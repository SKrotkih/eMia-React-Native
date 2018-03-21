//
//  GalleryRouter.swift
//  eMia
//

import UIKit

class GalleryRouter: NSObject {
   
   struct Storyboards {
      static let gallery = "Gallery"
   }

   struct Segue {
      static let editPostViewController = "EditPostViewController"
   }
   
   struct Identifiers {
      static let photoPostViewController = "PhotoPostViewController"
   }

   var rootViewController: GalleryViewController?
   
   var rootRouter = RootWireframe()
   private var selectedPost: PostModel?
}

// MARK: - Edit post

extension GalleryRouter {

   func performEditPost(_ post: PostModel) {
      guard let viewController = self.rootViewController else {
         return
      }
      selectedPost = post
      viewController.performSegue(withIdentifier: GalleryRouter.Segue.editPostViewController, sender: viewController)
   }
   
   func prepare(for segue: UIStoryboardSegue, sender: Any?) {
      if segue.identifier == GalleryRouter.Segue.editPostViewController {
         if let selectedPost = selectedPost {
            let editPostViewController = segue.destination as! EditPostViewController
            editPostViewController.post = selectedPost
         }
      }
   }
}

// MARK: - Preview Photo

extension GalleryRouter {
   
   var postPreviewViewController: PhotoPostViewController? {
      guard let photoPostViewController = UIStoryboard(name: GalleryRouter.Storyboards.gallery, bundle: nil).instantiateViewController(withIdentifier: GalleryRouter.Identifiers.photoPostViewController) as? PhotoPostViewController else {
         return nil
      }
      return photoPostViewController
   }
}

