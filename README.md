# eMia

This is the entire source code of the cross-platform (iOS and Android) app. 
It's developing with using [React Native](https://facebook.github.io/react-native/docs/getting-started.html) and [Firebase](https://firebase.google.com/docs/).

This is a demo movie on iOS device: 

![reactnative_ios](https://user-images.githubusercontent.com/2775621/40759771-2bb84a6e-649c-11e8-86b2-be6e8ed46ad1.gif)



## Introduction

There are two native apps. 
They are: [eMia-iOS](https://github.com/SKrotkih/eMia-iOS) 
and [eMia-Android](https://github.com/SKrotkih/eMia-Android).

eMia is a simple social network. 
You can be registered there, then edit your profile, post new topic with a title, description and a photo.
The App will sends you push-notification if another user likes your post.

eMia uses Firebase database, storage, authentication and cloud messages.

Notes. This version loads native (iOS, Swift 4) view controller on Filter scene which is launched on options menu button.  

## Requirements

- Xcode 9, Swift 4
- Android Studio 3.1

## Preparing for using

If you wish to try eMia, please following next steps.

For iOS
Sign in your Google account, then open Firebase console https://console.firebase.google.com
Create a new project. Please follow documentations https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app.
As a result you have to download GoogleService-Info.plist file and replace current one.

For Android
Sign in your Google account, then open Firebase console https://console.firebase.google.com
Create a new project. Then follow documentations. As a result you need to download google-services.json file and replace current one.

## Installation

Clone or unzip the repository.

In root directory  execute command:

npm install

### Build and run iOS app.

In ios directory put command in console: 

pod install

Then open the eMia.xcworkspace in Xcode.

Press on Cmd+R or click on the run button to run the app and the project should run.

### Build and run Android app.

Go to the eMia directory. Put command in console:

run command:

react-native start --port 8081

Start Android Studio.  Open android project. Run 'app'

## Demo video

https://youtu.be/tgvxxnFq-Sk

Last edited on 04-23-2018

Sergey Krotkih
