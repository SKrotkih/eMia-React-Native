//
//  GalleryPresenter.swift
//  eMia
//

import UIKit

class GalleryPresenter: NSObject {

   var router: GalleryRouter!
   var interactor: GalleryInteractor!
   var view: GalleryViewProtocol!
   
   func configure() {
      interactor.configure()
   }
   
   func startProgress() {
      view.startProgress()
   }

   func stopProgress() {
      view.stopProgress()
   }
   
   func fetchData(searchText: String = "") {
      interactor.fetchData(searchText: searchText)
   }
   
   func startSearch(_ text: String) {
      fetchData(searchText: text)
   }

   func stopSearch() {
      fetchData()
   }
   
   func editPost(for indexPath: IndexPath) {
      interactor.editPost(for: indexPath) { post in
         if let post = post {
            self.router.performEditPost(post)
         }
      }
   }

   func prepare(for segue: UIStoryboardSegue, sender: Any?) {
      router.prepare(for: segue, sender: sender)
   }
   
   func previewPhoto(for location: CGPoint) -> UIViewController? {
      if let image = interactor.previewPhoto(for: location), let postViewController = router.postPreviewViewController {
         postViewController.image = image
         return postViewController
      } else {
         return nil
      }
   }
   
}
