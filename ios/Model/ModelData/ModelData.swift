//
//  ModelData.swift
//  eMia
//

import UIKit
import Firebase
import FirebaseDatabase

typealias UserObserverClosure = (UserModel) -> Void
typealias DidUpdateObserverClosure = () -> ()

protocol UsersDataUpdating {
    func newUserItem()
    func updatedUserItem(_ userItem: UserItem)
    func removedUserItem()
}

protocol PostsDataBaseObservable {
    func addItem(_ item: PostItem)
    func deleteItem(_ item: PostItem)
    func editItem(_  item: PostItem)
}

protocol FavoritesDataBaseObservable {
    func addItem(_ item: FavoriteItem)
    func deleteItem(_ item: FavoriteItem)
    func editItem(_  item: FavoriteItem)
}

protocol CommentsDataBaseObservable {
    func addItem(_ item: CommentItem)
    func deleteItem(_ item: CommentItem)
    func editItem(_  item: CommentItem)
}

internal let ModelData = FetchingWorker.sharedInstance

class FetchingWorker: NSObject {
    
    let FETCHING_DATA_ASYNC = true
    
    static let sharedInstance: FetchingWorker = {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        return appDelegate.fetchingManager
    }()
    
    fileprivate var _users = [UserItem]()
    fileprivate var _posts = [PostItem]()
    fileprivate var _favorities = [FavoriteItem]()
    
    fileprivate var usersObserver = UsersObserver()
    fileprivate var postsObserver = PostsObserver()
    fileprivate var favoritiesObserver = FavoritiesObserver()
    
    fileprivate var dataFetched = false
    fileprivate var fetchingInProgress = false
    
    var usersOutput: UsersDataUpdating!
    var postsOutput: PostsDataBaseObservable?
    var favoritiesOutput: FavoritesDataBaseObservable?
    var commentsOutput: CommentsDataBaseObservable?
    
    let queueUsers = DispatchQueue(label: "\(AppConstants.ManufacturingName).\(AppConstants.ApplicationName).usersQueue")
    let queuePosts = DispatchQueue(label: "\(AppConstants.ManufacturingName).\(AppConstants.ApplicationName).postsQueue")
    let queueFavorities = DispatchQueue(label: "\(AppConstants.ManufacturingName).\(AppConstants.ApplicationName).favoritiesQueue")
    
    var users: [UserItem] {
        return queueUsers.sync{_users}
    }
    
    var posts: [PostItem] {
        return queuePosts.sync{_posts}
    }
    
    var favorities: [FavoriteItem] {
        return queuePosts.sync{_favorities}
    }
    
    func fetchData(completion: @escaping () -> Void) {
        if dataFetched || fetchingInProgress {
            completion()
            return
        }
        fetchingInProgress = true
        var fetchDataFunc: (@escaping() -> Void) -> Void
        
        if FETCHING_DATA_ASYNC {
            fetchDataFunc = fetchDataAsync
        } else {
            fetchDataFunc = fetchDataSync
        }
        fetchDataFunc() {
            self.dataFetched = true
            self.fetchingInProgress = false
            self.didDownloadAllData(completion)
        }
    }
    
    private func didDownloadAllData(_ completion: @escaping () -> Void) {
        print("users=\(self.users.count);posts=\(self.posts.count);favorities=\(self.favorities.count)")
        self.addObservers()
        DispatchQueue.main.async {
            completion()
        }
    }
    
    private func addObservers() {
        self.usersObserver.addObserver()
        self.postsObserver.addObserver()
        self.favoritiesObserver.addObserver()
        
        self.usersOutput = UsersManager
        self.favoritiesOutput = FavoritsManager
        self.postsOutput = PostsManager
    }
}

extension FetchingWorker {
    
    fileprivate func fetchDataSync(completion: @escaping () -> Void) {
        var x = CFAbsoluteTimeGetCurrent()
        
        self.fetchAllUsers(){
            self.fetchAllPosts(){
                self.fetchAllFavorities(){
                    
                    x = (CFAbsoluteTimeGetCurrent() - x) * 1000.0
                    print("Fetching all dats took \(x) milliseconds")
                    
                    completion()
                }
            }
        }
    }
    
    fileprivate func fetchDataAsync(completion: @escaping () -> Void) {
        var x = CFAbsoluteTimeGetCurrent()
        
        DispatchQueue.main.async {
            let usersRef = FireBaseManager.firebaseRef.child(UserFields.users)
            let postsRef = FireBaseManager.firebaseRef.child(PostItemFields.posts)
            let favoritiesRef = FireBaseManager.firebaseRef.child(FavoriteItemFields.favorits)
            let fetchingGroup = DispatchGroup()
            
            fetchingGroup.enter()
            DispatchQueue.global(qos: .utility).async(group: fetchingGroup, execute: {
                self.fetchAllUsers(usersRef){
                    fetchingGroup.leave()
                }
            })
            
            fetchingGroup.enter()
            DispatchQueue.global(qos: .utility).async(group: fetchingGroup, execute: {
                self.fetchAllPosts(postsRef){
                    fetchingGroup.leave()
                }
            })
            
            fetchingGroup.enter()
            DispatchQueue.global(qos: .utility).async(group: fetchingGroup, execute: {
                self.fetchAllFavorities(favoritiesRef){
                    fetchingGroup.leave()
                }
            })
            
            fetchingGroup.notify(queue: DispatchQueue.main) {
                
                x = (CFAbsoluteTimeGetCurrent() - x) * 1000.0
                print("Fetching all dats took \(x) milliseconds")
                
                completion()
            }
        }
    }
}

// MARK: - Fetching data

extension FetchingWorker {
    
    fileprivate func fetchAllUsers(_ dbRef: DatabaseReference? = nil, completion: @escaping () -> Void) {
        let usersRef = dbRef ?? FireBaseManager.firebaseRef.child(UserFields.users)
        usersRef.queryOrdered(byChild: "\\").observeSingleEvent(of: .value, with: { snapshot in
            for item in snapshot.children {
                let item = UserItem(item as! DataSnapshot)
                self.queueUsers.async {
                    self._users.append(item)
                }
            }
            completion()
        })
    }
    
    fileprivate func fetchAllPosts(_ dbRef: DatabaseReference? = nil, completion: @escaping () -> Void) {
        let postsRef = FireBaseManager.firebaseRef.child(PostItemFields.posts)
        postsRef.queryOrdered(byChild: "\\").observeSingleEvent(of: .value, with: { snapshot in
            for item in snapshot.children {
                let item = PostItem(item as! DataSnapshot)
                self.queuePosts.async {
                    self._posts.append(item)
                }
            }
            completion()
        })
    }
    
    fileprivate func fetchAllFavorities(_ dbRef: DatabaseReference? = nil, completion: @escaping () -> Void) {
        let favoritiesRef = FireBaseManager.firebaseRef.child(FavoriteItemFields.favorits)
        favoritiesRef.queryOrdered(byChild: "\\").observeSingleEvent(of: .value, with: { snapshot in
            for item in snapshot.children {
                if let snapshot = item as? DataSnapshot, let _ = snapshot.value as? Dictionary<String, String> {
                    let item = FavoriteItem(snapshot)
                    self.queueFavorities.async {
                        self._favorities.append(item)
                    }
                }
            }
            completion()
        })
    }
    
    func fetchAllComments(_ dbRef: DatabaseReference? = nil, for post: PostModel, addComment: @escaping (CommentItem) -> Void, completion: @escaping () -> Void) {
        guard let postId = post.id else {
            completion()
            return
        }
        let commentsRef = dbRef ?? FireBaseManager.firebaseRef.child(CommentItemFields.comments).child(postId)
        commentsRef.queryOrdered(byChild: "\\").observeSingleEvent(of: .value, with: { snapshot in
            for item in snapshot.children {
                let item = CommentItem(item as! DataSnapshot)
                addComment(item)
            }
            completion()
        })
    }
}

// MARK: - changes on the firebase database listeners

// users database updated

extension FetchingWorker {
    
    func addUserListener(_ item: UserItem) {
        if let _ = usersIndex(of: item) {
            return
        } else {
            self.queueUsers.async {
                self._users.append(item)
                self.usersOutput.newUserItem()
            }
        }
    }
    
    func deleteUserListener(_ item: UserItem) {
        if let index = usersIndex(of: item) {
            self.queueUsers.async {
                self._users.remove(at: index)
                self.usersOutput.removedUserItem()
            }
        }
    }
    
    func editUserListener(_  item: UserItem) {
        if let index = usersIndex(of: item) {
            self.queueUsers.async {
                self._users[index] = item
                self.usersOutput.updatedUserItem(item)
            }
        }
    }
    
    fileprivate func usersIndex(of item: UserItem) -> Int? {
        let index = users.index(where: {$0 == item})
        return index
    }
}

// Posts database updated

extension FetchingWorker {
    
    func addPostsListener(_ item: PostItem) {
        if let _ = postsIndex(of: item) {
        } else {
            self.queuePosts.async {
                self._posts.append(item)
                self.postsOutput?.addItem(item)
            }
        }
    }
    
    func deletePostsListener(_ item: PostItem) {
        if let index = postsIndex(of: item) {
            self.queuePosts.async {
                self._posts.remove(at: index)
                self.postsOutput?.deleteItem(item)
            }
        }
    }
    
    func editPostsListener(_  item: PostItem) {
        if let index = postsIndex(of: item) {
            self.queuePosts.async {
                self._posts[index] = item
                self.postsOutput?.editItem(item)
            }
        }
    }
    
    fileprivate func postsIndex(of item: PostItem) -> Int? {
        let index = posts.index(where: {$0 == item})
        return index
    }
}

// favorities database updated

extension FetchingWorker {
    
    func addFavoritiesListener(_ item: FavoriteItem) {
        if let _ = favoritiesIndex(of: item) {
        } else {
            self.queueFavorities.async {
                self._favorities.append(item)
                self.favoritiesOutput?.addItem(item)
            }
        }
    }
    
    func deleteFavoritiesListener(_ item: FavoriteItem) {
        if let index = favoritiesIndex(of: item) {
            self.queueFavorities.async {
                self._favorities.remove(at: index)
                self.favoritiesOutput?.deleteItem(item)
            }
        }
    }
    
    func editFavoritiesListener(_  item: FavoriteItem) {
        if let index = favoritiesIndex(of: item) {
            self.queueFavorities.async {
                self._favorities[index] = item
                self.favoritiesOutput?.editItem(item)
            }
        }
    }
    
    fileprivate func favoritiesIndex(of item: FavoriteItem) -> Int? {
        let index = favorities.index(where: {$0 == item})
        return index
    }
}

