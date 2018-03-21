
import UIKit

protocol GalleryCellHeightComputed: class {
  // 1. Method to ask the delegate for the height of the image
  func collectionView(_ collectionView:UICollectionView, heightForCellAtIndexPath indexPath:IndexPath) -> CGFloat
}

class GalleryLayout: UICollectionViewLayout {
  //1. Pinterest Layout Delegate
  weak var delegate: GalleryCellHeightComputed!
  
  //2. Configurable properties
  fileprivate var numberOfColumns = 2
  fileprivate var cellPadding: CGFloat = 6
  
  //3. Array to keep a celsAttributes of attributes.
  fileprivate var celsAttributes = [UICollectionViewLayoutAttributes]()
  
  //4. Content height and size
  fileprivate var contentHeight: CGFloat = 0
  
  fileprivate var contentWidth: CGFloat {
    guard let collectionView = collectionView else {
      return 0
    }
    let insets = collectionView.contentInset
    return collectionView.bounds.width - (insets.left + insets.right)
  }
  
  override var collectionViewContentSize: CGSize {
    return CGSize(width: contentWidth, height: contentHeight)
  }
  
  override func prepare() {
    // 1. Only calculate once
    guard celsAttributes.isEmpty == true, let collectionView = collectionView else {
      return
    }
    // 2. Pre-Calculates the X Offset for every column and adds an array to increment the currently max Y Offset for each column
    let columnWidth = contentWidth / CGFloat(numberOfColumns)
    var xOffset = [CGFloat]()
    for column in 0 ..< numberOfColumns {
      xOffset.append(CGFloat(column) * columnWidth)
    }
    var column = 0
    var yOffset = [CGFloat](repeating: 0, count: numberOfColumns)
    
    // 3. Iterates through the list of items in the first section
    for item in 0 ..< collectionView.numberOfItems(inSection: 0) {
      
      let indexPath = IndexPath(item: item, section: 0)
      
      // 4. Asks the delegate for the height of the picture and the annotation and calculates the cell frame.
      let photoHeight = delegate.collectionView(collectionView, heightForCellAtIndexPath: indexPath)
      let height = cellPadding * 2 + photoHeight
      let frame = CGRect(x: xOffset[column], y: yOffset[column], width: columnWidth, height: height)
      let insetFrame = frame.insetBy(dx: cellPadding, dy: cellPadding)
      
      // 5. Creates an UICollectionViewLayoutItem with the frame and add it to the celsAttributes
      let cellAttributes = UICollectionViewLayoutAttributes(forCellWith: indexPath)
      cellAttributes.frame = insetFrame
      celsAttributes.append(cellAttributes)
      
      // 6. Updates the collection view content height
      contentHeight = max(contentHeight, frame.maxY)
      yOffset[column] = yOffset[column] + height
      
      column = column < (numberOfColumns - 1) ? (column + 1) : 0
    }
  }
  
  override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
    
    var visibleLayoutAttributes = [UICollectionViewLayoutAttributes]()
    
    // Loop through the celsAttributes and look for items in the rect
    for cellAttributes in celsAttributes {
      if cellAttributes.frame.intersects(rect) {
        visibleLayoutAttributes.append(cellAttributes)
      }
    }
    return visibleLayoutAttributes
  }
  
  override func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
    return celsAttributes[indexPath.item]
  }
}
