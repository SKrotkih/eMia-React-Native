//
//  GalleryInteractor.swift
//  eMia
//

import UIKit
import DTCollectionViewManager
import DTModelStorage

class GalleryInteractor: NSObject {
    
    var output: GalleryPresenter!
    var manager: DTCollectionViewManager!
    var collectionView: UICollectionView?
    var delegate: DTCollectionViewManageable!
    var filerManager: FilterManager!
    
    fileprivate var mSearchText: String?
    
    func configure() {
        PostsManager.postsListener() {
            let searchText = self.mSearchText ?? ""
            self.fetchData(searchText: searchText)
        }
        
        self.manager.startManaging(withDelegate: self.delegate)
        self.manager.configureEvents(for: GalleryViewCell.self) { cellType, modelType in
            self.manager.register(cellType)
            self.manager.registerHeader(GalleryHeaderView.self)
            self.manager.registerFooter(GalleryHeaderView.self)
            self.manager.sizeForCell(withItem: modelType) { [weak self] _, indexPath in
                
                guard let _ = self?.collectionView?.collectionViewLayout as? UICollectionViewFlowLayout else {
                    return .zero
                }
                guard let w = self?.collectionView?.frame.width else {
                    return .zero
                }
               
                let section = self?.manager.memoryStorage.sections[indexPath.section]
                var contentWidth: CGFloat = 0.0
                var contentHeight: CGFloat = 0.0
                
                let cellPadding: CGFloat = 6
                let titleHeight: CGFloat = 71.0
                let columnsCount: CGFloat = 2.0
                
                if let model: PostModel = section?.items[indexPath.row] as? PostModel, model.photoSize != (0.0, 0.0) {
                    let photoWidth = model.photoSize.0
                    let photoHeight = model.photoSize.1
                    contentWidth = (w / columnsCount) - cellPadding
                    let imageHeight: CGFloat = contentWidth / photoWidth * photoHeight
                    contentHeight = imageHeight + titleHeight
                } else {
                    contentWidth = (w / columnsCount) - cellPadding
                    contentHeight = GalleryViewController.kCellHeight
                }
                let size = CGSize(width: contentWidth, height: contentHeight)
                return size
            }
        }
    }

    deinit {
        PostsManager.removeListener()
    }
    
    func fetchData(searchText: String = "") {
        output.startProgress()
        
        DispatchQueue.global(qos: .utility).async() {
            let data = PostsManager.getData()
            let filteredData = self.filterPosts(data, searchText: searchText)
            
            DispatchQueue.main.async {
                
                let section = SectionModel()
                section.collectionHeaderModel = "Near dig".localized
                // section.collectionFooterModel = "Section 0 footer"
                
                let section2 = SectionModel()
                section2.collectionHeaderModel = "I din region".localized
                
                self.deleteAllSections()
                section.items = filteredData
                section2.items = filteredData
                self.manager.memoryStorage.insertSection(section, atIndex: 0)
                self.manager.memoryStorage.insertSection(section2, atIndex: 1)
                
                self.output.stopProgress()
            }
        }
    }
    
    private func deleteAllSections() {
        if self.manager.memoryStorage.sections.count > 0 {
            var sections = IndexSet()
            for index in 0..<self.manager.memoryStorage.sections.count {
                sections.insert(index)
            }
            self.manager.memoryStorage.deleteSections(sections)
        }
    }
    
    private func filterPosts(_ posts: [PostModel], searchText: String = "") -> [PostModel] {
        mSearchText = searchText
        return filerManager.filterPosts(posts,searchText: searchText)
    }
}

// MARK: -

extension GalleryInteractor {
    
    func editPost(for indexPath: IndexPath, completion: (PostModel?) -> Void) {
        if let post = manager.storage.item(at: indexPath) as? PostModel {
            completion(post)
        } else {
            completion(nil)
        }
    }
}

// MARK: - Preview Photo

extension GalleryInteractor {
    
    func previewPhoto(for location: CGPoint) -> UIImage? {
        guard let indexPath = collectionView?.indexPathForItem(at: location) else {
            return nil
        }
        guard let image = getPhotoFor(indexPath: indexPath) else {
            return nil
        }
        return image
    }
    
    private func getPhotoFor(indexPath: IndexPath) -> UIImage? {
        guard let cell = collectionView?.cellForItem(at: indexPath) as? GalleryViewCell, let photoImageView = cell.photoImageView  else {
            return nil
        }
        return photoImageView.image
    }
}
