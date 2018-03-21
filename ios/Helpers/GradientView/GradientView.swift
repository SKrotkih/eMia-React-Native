//
//  GradientView.swift
//  eMia
//

import UIKit

class GradientView: UIView {
    
    // Default Colors
    var colors:[UIColor] = [UIColor.clear, UIColor.black.withAlphaComponent(0.4)]
    
    override func draw(_ rect: CGRect) {
        
        // Must be set when the rect is drawn
        setGradient(color1: colors[0], color2: colors[1])
    }
    
    func setGradient(color1: UIColor, color2: UIColor) {
        
        let context = UIGraphicsGetCurrentContext()
        //        let gradient = CGGradientCreateWithColors(CGColorSpaceCreateDeviceRGB(), [color1.cgColor, color2.cgColor], [0, 1])!
        
        let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: [color1.cgColor, color2.cgColor] as CFArray, locations: [0, 1])
        
        // Draw Path
        let path = UIBezierPath(rect: bounds)
        context!.saveGState()
        path.addClip()
        
        // CGPointMake(frame.width / 2, 0)
        
        context!.drawLinearGradient(gradient!, start: CGPoint(x: bounds.midX, y: 0), end: CGPoint(x: bounds.midX, y: bounds.height), options: CGGradientDrawingOptions())
        context!.restoreGState()
    }
    
    override func layoutSubviews() {
        
        // Ensure view has a transparent background color (not required)
        backgroundColor = UIColor.clear
    }
}
