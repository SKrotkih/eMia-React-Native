//
//  NativeModulesBridge.m
//  SwiftBridge
//

#import <Foundation/Foundation.h>

// NativeModulesBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date callback: (RCTResponseSenderBlock)callback);

@end
