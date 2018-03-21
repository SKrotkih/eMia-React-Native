//
//  CollectionViewController.swift
//  eMia
//

import UIKit
import DTCollectionViewManager
import NVActivityIndicatorView

protocol GalleryViewProtocol {
   var galleryManager: DTCollectionViewManager { get }
   var galleryCollectionView: UICollectionView? { get }
   func startProgress()
   func stopProgress()
}

class GalleryViewController: UIViewController, DTCollectionViewManageable, UICollectionViewDelegateFlowLayout {

   var eventHandler: GalleryPresenter!
   var presenter: GalleryPresenter!

   static let kHeaderHeight: CGFloat = 40.0
   static let kCellHeight: CGFloat = 250.0
   
   @IBOutlet weak var collectionView: UICollectionView?
   @IBOutlet weak var newPostButton: UIButton!
   
   @IBOutlet weak var searchBackgroundView: UIView!
   @IBOutlet weak var searchBar: UISearchBar!
   @IBOutlet weak var searchBaxckgroundViewTopConstraint: NSLayoutConstraint!
   
   @IBOutlet weak var activityIndicatorView: NVActivityIndicatorView!
   
   override func viewDidLoad() {
      super.viewDidLoad()

      navigationItem.title = "\(AppConstants.ApplicationName)"
      
      GalleryDependencies.configure(view: self)
      presenter.configure()
      configureSubviews()
   }

   @IBAction func exitToGalleryController(_ segue: UIStoryboardSegue) {
   }

   private func configureSubviews() {
      configure(searchBar)
      configure(newPostButton)
      configure(collectionView!)
      configure(searchBackgroundView)
      setUp3DPreviewPhoto()
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case newPostButton:
         newPostButton.layer.cornerRadius = newPostButton.frame.width / 2.0
         newPostButton.backgroundColor = GlobalColors.kBrandNavBarColor
      case collectionView!:
         setUpHeaderSize()
         setUpFooterSize()
      case searchBackgroundView:
         searchBackgroundView.backgroundColor = GlobalColors.kBrandNavBarColor
      case searchBar:
         searchBar.delegate = self
         searchBar.tintColor = GlobalColors.kBrandNavBarColor
         searchBar.backgroundColor = GlobalColors.kBrandNavBarColor
         searchBar.backgroundImage = UIImage()
         searchBar.placeholder = "Search template".localized
      default:
         break
      }
   }
   
   override func viewWillAppear(_ animated: Bool) {
      super.viewWillAppear(animated)

      let searchText = searchBar.text ?? ""
      self.presenter.fetchData(searchText: searchText)
   }

   override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
      eventHandler.prepare(for: segue, sender: sender)
   }

   private func setUp3DPreviewPhoto() {
      if traitCollection.forceTouchCapability == .available {
         registerForPreviewing(with: self, sourceView: collectionView!)
      }
   }
   
   private func setUpHeaderSize() {
      let headerSize = CGSize(width: self.view.frame.width, height: GalleryViewController.kHeaderHeight)
      (collectionView?.collectionViewLayout as? UICollectionViewFlowLayout)?.headerReferenceSize = headerSize
   }
   
   private func setUpFooterSize() {
      let footerSize = CGSize(width: self.view.frame.width, height: GalleryViewController.kHeaderHeight)
      (collectionView?.collectionViewLayout as? UICollectionViewFlowLayout)?.footerReferenceSize = footerSize
   }
   
   override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
      self.view.endEditing(true)
      searchBar.resignFirstResponder()
   }
   
}

// MARK: - View Protocol

extension GalleryViewController: GalleryViewProtocol {

   var galleryManager: DTCollectionViewManager {
      return self.manager
   }
   
   var galleryCollectionView: UICollectionView? {
      return self.collectionView
   }
   
   func startProgress() {
      DispatchQueue.main.async {
         self.activityIndicatorView.startAnimating()
      }
   }

   func stopProgress() {
      DispatchQueue.main.async {
         self.activityIndicatorView.stopAnimating()
      }
   }
   
}

// MARK: - UICollectionViewDelegate

extension GalleryViewController: UICollectionViewDelegate {

   public func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
      eventHandler.editPost(for: indexPath)
   }
}

// MARK: - Hide/Show search bar while scrolling up/down

extension GalleryViewController {

   public func scrollViewDidScroll(_ scrollView: UIScrollView) {
      hideKeyboard()
      if(scrollView.panGestureRecognizer.translation(in: scrollView.superview).y > 0)
      {
         searchBaxckgroundViewTopConstraint.constant = 0.0
         UIView.animate(withDuration: 0.3, delay: 0, options: UIViewAnimationOptions(), animations: {
            self.view.layoutIfNeeded()
         }, completion: nil)
      }
      else
      {
         searchBaxckgroundViewTopConstraint.constant = -64.0
         UIView.animate(withDuration: 0.3, delay: 0, options: UIViewAnimationOptions(), animations: {
            self.view.layoutIfNeeded()
         }, completion: nil)
      }
   }
}

// MARK: - UISearchBarDelegate

extension GalleryViewController: UISearchBarDelegate {
   
   public func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
      if search(searchBar.text) {
         hideKeyboard()
      }
   }

   public func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
      if needStopSearch(for: searchText) {
         hideKeyboard()
      }
   }
   
   private func search(_ text: String?) -> Bool {
      if let text = text, text.isEmpty == false {
         presenter.startSearch(text)
         return true
      } else {
         return false
      }
   }
   
   private func needStopSearch(for text: String) -> Bool {
      if text.isEmpty {
         presenter.stopSearch()
         return true
      } else {
         return false
      }
   }
   
   fileprivate func hideKeyboard() {
      searchBar.resignFirstResponder()
   }
   
}

// MARK: - UIViewControllerPreviewingDelegate

extension GalleryViewController: UIViewControllerPreviewingDelegate {
   
   func previewingContext(_ previewingContext: UIViewControllerPreviewing,
                          commit viewControllerToCommit: UIViewController) {
      
   }

   func previewingContext(_ previewingContext: UIViewControllerPreviewing, viewControllerForLocation location: CGPoint) -> UIViewController? {
      return eventHandler.previewPhoto(for: location)
   }
}
