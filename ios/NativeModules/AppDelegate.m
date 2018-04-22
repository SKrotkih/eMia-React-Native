#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCCManager.h"

@implementation AppDelegate

- (BOOL) application: (UIApplication *)application didFinishLaunchingWithOptions: (NSDictionary *) launchOptions
{
   NSURL* jsCodeLocation;
   
#ifdef DEBUG
   
   //jsCodeLocation = [NSURL URLWithString: @"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot: @"index.ios" fallbackResource: nil];

#else
   
   jsCodeLocation = [[NSBundle mainBundle] URLForResource: @"main" withExtension: @"jsbundle"];
   
#endif

   RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL: jsCodeLocation
                                                       moduleName: @"eMia"
                                                initialProperties: nil
                                                    launchOptions: launchOptions];
   
   rootView.backgroundColor = [UIColor colorNamed: @"BrandNavBarColor"];
   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
   UIViewController *rootViewController = [UIViewController new];
   rootViewController.view = rootView;
   self.window.rootViewController = rootViewController;
   [self.window makeKeyAndVisible];
   
   return YES;
}

@end
