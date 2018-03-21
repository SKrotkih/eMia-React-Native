//
//  NewPostViewController.swift
//  eMia
//

import UIKit

class NewPostViewController: UIViewController {
    
    internal struct CellName {
        static let newPost1ViewCell = "NewPost1ViewCell"
        static let newPost2ViewCell = "NewPost2ViewCell"
        static let newPost3ViewCell = "NewPost3ViewCell"
    }
    
    enum Rows: Int {
        case Title
        case Body
        case Photo
        
        static var count: Int {
            return 3
        }
    }
    
    static fileprivate let kMinBodyCellHeight: CGFloat = 78.0
    
    @IBOutlet weak var saveButton: UIButton!
    @IBOutlet weak var tableView: UITableView!
    
    fileprivate var titleCell: NewPost1ViewCell!
    fileprivate var bodyCell: NewPost2ViewCell!
    fileprivate var photoCell: NewPost3ViewCell!
    
    fileprivate var textBodyHeight: CGFloat = NewPostViewController.kMinBodyCellHeight
    
    override func viewDidLoad() {
        navigationItem.title = "\(AppConstants.ApplicationName) - My New Post".localized
        configureView()
    }
    
    private func configureView() {
        configure(tableView)
        configure(saveButton)
    }
    
    private func configure(_ view: UIView) {
        switch view {
        case tableView:
            tableView.rowHeight = UITableViewAutomaticDimension
            tableView.estimatedRowHeight = 140
            tableView.delegate = self
            tableView.dataSource = self
        case saveButton:
            saveButton.layer.cornerRadius = saveButton.frame.width / 2.0
            saveButton.backgroundColor = GlobalColors.kBrandNavBarColor
        default:
            break
        }
    }
    
    @IBAction func backButtonPressed(_ sender: Any) {
        close()
    }
    
    @IBAction func saveButtonPressed(_ sender: Any) {
        save()
    }
}

// MARK: - TableView delegate protocol implementation

extension NewPostViewController: UITableViewDelegate, UITableViewDataSource {
    
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return Rows.count
    }
    
    public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if let selector = Rows(rawValue: indexPath.row) {
            switch selector {
            case .Title:
                return 59.0
            case .Body:
                return textBodyHeight
            case .Photo:
                return 364.0
            }
        } else {
            return 0.0
        }
    }
    
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if let selector = Rows(rawValue: indexPath.row) {
            switch selector {
            case .Title:
                titleCell = tableView.dequeueReusableCell(withIdentifier: CellName.newPost1ViewCell) as! NewPost1ViewCell
                return titleCell
            case .Body:
                bodyCell = tableView.dequeueReusableCell(withIdentifier: CellName.newPost2ViewCell) as! NewPost2ViewCell
                bodyCell.didChangeHeight = { height in
                    if height > self.textBodyHeight {
                        self.textBodyHeight = height
                        self.tableView.reloadData()
                        runAfterDelay(0.2) {
                            let _ = self.bodyCell.postBodyTextView.becomeFirstResponder()
                        }
                    }
                }
                return bodyCell
            case .Photo:
                photoCell = tableView.dequeueReusableCell(withIdentifier: CellName.newPost3ViewCell) as! NewPost3ViewCell
                photoCell.viewController = self
                return photoCell
            }
        } else {
            let cell = UITableViewCell()
            return cell
        }
    }
}

// MARK: - Create new Post

extension NewPostViewController {
    
    fileprivate func save() {
        guard let currentUser = UsersManager.currentUser else {
            Alert.default.showOk("", message: "Only for registered users!".localized)
            return
        }
        let title = titleCell.titlePostText
        if title.isEmpty {
            titleCell.invalidValue()
            return
        }
        guard let image = photoCell.photoImage else {
            Alert.default.showOk("", message: "Please add photo to your post!".localized)
            return
        }
        let bodyText = bodyCell.postBodyText
        let photosize = "\(image.size.width);\(image.size.height)"
        let newPost = PostModel(uid: currentUser.userId, author: currentUser.name, title: title, body: bodyText, photosize: photosize)
        newPost.synchronize() { postid in
            if (postid.isEmpty) {
                Alert.default.showOk("Somethig went wrong!".localized, message: "We can't upload a photo on server".localized)
            } else {
                PhotosManager.uploadPhoto(image, for: postid) { success in
                    if success {
                        self.close()
                    } else {
                        Alert.default.showOk("Somethig went wrong!".localized, message: "We can't create a new post on server".localized)
                    }
                }
            }
        }
    }
    
    fileprivate func close() {
        self.navigationController?.popViewController(animated: true)
    }
}

