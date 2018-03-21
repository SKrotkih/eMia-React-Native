//
//  RangeSlider.swift
//  eMia
//

import UIKit

@IBDesignable  class RangeSlider: UIControl {

	@IBInspectable var outterTrackTintColor = UIColor(red: 151/255, green: 151/255, blue: 151/255, alpha: 1)
	@IBInspectable var innerTrackTintColor = UIColor(red: 255/255, green: 51/255, blue: 102/255, alpha: 1)
	
	@IBInspectable var minimumValue: Float = 0
	@IBInspectable var maximumValue: Float = 1
	
	@IBInspectable var lowerValue: Double = 0.2 {
		didSet {
//			updateLayerFrames()
		}
	}
	
	@IBInspectable var upperValue: Double = 0.8 {
		didSet {
//			updateLayerFrames()
		}
	}
	
	
	@IBInspectable var deltaValue: Float = 0.1
	
	var slider: UISlider!
	
	private var outerTrackView: UIView!
	private var innerTrackView: UIView!
	
	private var minimumThumbView: UIImageView!
	private var maximunThumView: UIImageView!
	private var movingThumbView: UIView?
	
	private var minimumThumbViewLeadingingConstraint: NSLayoutConstraint!
	private var maximunThumbViewTrailingConstraint: NSLayoutConstraint!
	
	private var deltaWidth: CGFloat {
		return outerTrackView.bounds.width / CGFloat((maximumValue - minimumValue) * deltaValue)
	}
	
	private struct Constants {
		private init(){}
		static let thumbWidth: CGFloat = 33
		static let outerTrackViewHeight: CGFloat = 2
		static let innerTrackViewHeight: CGFloat = 40
	}
	
	
	//	MARK: - Initialization
	override init(frame: CGRect) {
		super.init(frame: frame)
		setupControl()
	}
	
	required init(coder: NSCoder) {
		super.init(coder: coder)!
		setupControl()
	}
	
	
	//	MARK: - Size
	override var intrinsicContentSize: CGSize {
		return CGSize(width: super.intrinsicContentSize.width, height: Constants.thumbWidth)
	}
	
	//	MARK: - Utility
	private func setupControl() {
		for view in subviews {
			view.removeFromSuperview()
		}
		
		// Load images
		let bundle = Bundle(for: type(of: self))
		let iconSlider = UIImage(named: "Icon-Slider", in: bundle, compatibleWith: self.traitCollection)
		
		// Outter tack view
		outerTrackView = UIView()
		addSubview(outerTrackView)
		configure(outerTrackView)
		
		outerTrackView.translatesAutoresizingMaskIntoConstraints = false
		outerTrackView.leadingAnchor.constraint(equalTo: leadingAnchor).isActive = true
		trailingAnchor.constraint(equalTo: outerTrackView.trailingAnchor).isActive = true
		outerTrackView.centerYAnchor.constraint(equalTo: centerYAnchor).isActive = true
		outerTrackView.heightAnchor.constraint(equalToConstant: Constants.outerTrackViewHeight).isActive = true
		
		// Minimum thumb view
		minimumThumbView = UIImageView(image: iconSlider)
		configure(minimumThumbView)
		addSubview(minimumThumbView)
		
		minimumThumbView.translatesAutoresizingMaskIntoConstraints = false
		minimumThumbViewLeadingingConstraint = minimumThumbView.centerXAnchor.constraint(equalTo: outerTrackView.leadingAnchor, constant: 40)
		minimumThumbViewLeadingingConstraint.isActive = true
		
		minimumThumbView.centerYAnchor.constraint(equalTo: outerTrackView.centerYAnchor).isActive = true
		
		
		// Maximun thumb view
		maximunThumView = UIImageView(image: iconSlider)
		addSubview(maximunThumView)
		
		maximunThumView.translatesAutoresizingMaskIntoConstraints = false
		maximunThumbViewTrailingConstraint =  outerTrackView.trailingAnchor.constraint(equalTo: maximunThumView.centerXAnchor, constant: 40)
		maximunThumbViewTrailingConstraint.isActive = true
		
		maximunThumView.centerYAnchor.constraint(equalTo: outerTrackView.centerYAnchor).isActive = true
		
		
		// Inner view
		innerTrackView = UIView()
		configure(innerTrackView)
		insertSubview(innerTrackView, aboveSubview: outerTrackView)
		
		innerTrackView.translatesAutoresizingMaskIntoConstraints = false
		innerTrackView.leadingAnchor.constraint(equalTo: minimumThumbView.centerXAnchor).isActive = true
		maximunThumView.centerXAnchor.constraint(equalTo: innerTrackView.trailingAnchor).isActive = true
		innerTrackView.centerYAnchor.constraint(equalTo: outerTrackView.centerYAnchor).isActive = true
		innerTrackView.heightAnchor.constraint(equalToConstant: Constants.outerTrackViewHeight).isActive = true
		
		
		// Pan gesture
		let panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePanGesture(_:)))
		addGestureRecognizer(panGesture)
	}
   
   private func configure(_ view: UIView) {
      switch view {
      case outerTrackView:
         outerTrackView.backgroundColor = outterTrackTintColor
         
      case minimumThumbView: break
         
      case innerTrackView:
         innerTrackView.backgroundColor = innerTrackTintColor
         
      default:break
      }
   }

	// MARK: - Outlets
	// MARK: Gesture recognizers
	@objc private func handlePanGesture(_ recognizer: UIPanGestureRecognizer) {
		
		let location = recognizer.location(in: self)
		
		if movingThumbView == nil {
			if minimumThumbView.frame.contains(location) {
				movingThumbView = minimumThumbView
			} else if maximunThumView.frame.contains(location) {
				movingThumbView = maximunThumView
			} else {
				return
			}
		}
		
		switch recognizer.state {
		case .began: break
		case .changed:
			let translation = recognizer.translation(in: self)
			var center = movingThumbView!.center
			center.x += translation.x
			
			if movingThumbView == minimumThumbView {
				if center.x > minimumThumbView.bounds.width / 2 - 2
					&& (center.x + minimumThumbView.bounds.width / 2)  < outerTrackView.frame.maxX - maximunThumView.frame.width - deltaWidth{
					minimumThumbViewLeadingingConstraint.constant = center.x
					layoutIfNeeded()
					if minimumThumbView.frame.maxX > maximunThumView.frame.minX - deltaWidth {
						maximunThumbViewTrailingConstraint.constant -= translation.x
						layoutIfNeeded()
					}
					self.sendActions(for: .valueChanged)
					
				}
			} else {
				
				if center.x < (outerTrackView.bounds.width - maximunThumView.bounds.width / 2) + 5
					&& center.x > outerTrackView.frame.minX + minimumThumbView.frame.width + deltaWidth + maximunThumView.bounds.midX {
					
					maximunThumbViewTrailingConstraint.constant = outerTrackView.bounds.width - center.x
					layoutIfNeeded()
					
					if maximunThumView.frame.minX - deltaWidth < minimumThumbView.frame.maxX {
						minimumThumbViewLeadingingConstraint.constant += translation.x
						layoutIfNeeded()
					}
					self.sendActions(for: .valueChanged)
				}
			}
			
			recognizer.setTranslation(CGPoint.zero, in: self)
		default:
			movingThumbView = nil
		}
	}
}
