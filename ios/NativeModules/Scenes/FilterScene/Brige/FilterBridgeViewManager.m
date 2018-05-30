//
//  FilterBridgeViewManager.m
//  eMia
//
//  Created by Сергей Кротких on 22/04/2018.
//  Copyright © 2018 Coded I/S. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FilterBridgeViewManager.h"
#import "eMia-Swift.h"

@class FilterBridgeView;

@implementation FilterBridgeViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
   return [FilterBridgeView new];
}

@end
