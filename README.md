# eMia - React Native

Here is an entire source code cross-platform mobile application something like easy social network, developed with using [React Native](https://facebook.github.io/react-native/docs/getting-started.html). 
What else can you find here? 
- JavaScript
- TypeScript
- Redux
- [Firebase](https://firebase.google.com/docs/) - backend (first from the two backends)
- Node.js (Express, MongoDB) - second backend implementation of the project you can find here: [eMia-Node-js-Server](https://github.com/SKrotkih/eMia-Node-js-Server)
- React Navigation
- Native iOS components on Swift
- current React Native is 0.63 version
- some custom components
- async Redux actions 
- Function components with hooks

How it looks like on an iOS device (on the left side) and on Android (on the right): 

![emia1](https://user-images.githubusercontent.com/2775621/89017559-29fd3e80-d323-11ea-9372-f9680df561f6.gif)

![emia2](https://user-images.githubusercontent.com/2775621/89018458-975d9f00-d324-11ea-90f7-0b9ddfe84851.gif)

## Introduction

eMia is a simple social network. 
You can sign in, sign up, sign out, restore the password, edit profile, add a new post (title, body, photo),  filter posts.
You will get  push-notification if another user likes your post.

eMia uses Firebase database, storage, authentication and cloud messages.

Notes. The current version contains also some native stuff. For example: Filter View Controller (iOS) which is appeared with using 'Options' menu button.  

## Requirements

- Xcode 11, Swift 5
- Android Studio 3.1

## Preparing for using

If you are going to try eMia by yourself, you should register app on Firebase. Follow following instructions:

For iOS
Sign in your Google account, open Firebase console https://console.firebase.google.com
Create a new project. Follow documentations https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app.
Download GoogleService-Info.plist. Then with using GoogleService-Info.plist fill constants in \src\config\App-Info.js file
(copy file \src\config\App-Info.js.example to \src\config\App-Info.js before).

For Android
Sign in your Google account, open Firebase console https://console.firebase.google.com
Create a new project. Follow documentations. As a result you need to download google-services.json.

## Installation

Clone or unzip the repository.

In root directory  execute command:

yarn   (or npm install)

cd ios

pod install

Note. To fix issue with CocoaPods whet it could not find compatible versions for pod "React/Core":
cd ..
grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'

## Run and Debug the App

In Root directory:

react-native run-ios

or

cd ios

Open the eMia.xcworkspace in Xcode.

Press on Cmd+R or click on the run button to run the app and the project should run.
Now you can debug native code

or

Open the project (root directory) in Visual Studio Code (VCS).
Add extension React Native Tools the the VSC
Add "Debug iOS" and "Debug Android" (reactnative type ) into the launch.json
In VSC you can debug Java Script code.

In VSC run Main Menu -> Run -> Start Debugging (F5)

The App should start

<img src="https://user-images.githubusercontent.com/2775621/81370480-f208a580-90fd-11ea-8482-5718e9b518c5.png" alt="eMia is launched" style="width: 690px;" />

### Build and run Android app

Go to the eMia directory. Put command in console:

react-native start --port 8081

Start Android Studio.  Open android project. Run 'app'

## Afterword

There are also two native examples of the app:
iOS - [eMia-iOS](https://github.com/SKrotkih/eMia-iOS)
Android - [eMia-Android](https://github.com/SKrotkih/eMia-Android).

## Demo video

https://youtu.be/tgvxxnFq-Sk

First build was developed: 07-05-2018

Last updating: 05-22-2020.
Changes description:
- moved on the 0.62.2 [react-native](https://reactnative.dev/) package version.
- updated dependencies
- started porting on the TypeScript: renamed almost all js file to ts/tsx,
  for some ts-modules were applied TypeScript rules. 
