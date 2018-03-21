# eMia

This is the entire source code of the cross-platform (iOS and Android) app. 
It is developing with the React Native.

It is an application like a forum. 
You can register as an user and then sign in. You can edit your profile.
You can post topics with a title, description and a body, attach a photo.
The App will sends you push-notification if another user likes your post.

eMia uses Firebase database, storage, authentication and cloud messages.

## Requirements

iOS
- macOS 10.13
- Xcode 9.2
- Swift 4

Android
- Android Studio 3.0.1

## Introduction

If you want to try eMia, please following next steps.

For iOS
Sign in your Google account, then open Firebase console https://console.firebase.google.com
Create a new project. Please follow documentations https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app.
As a result you have to download GoogleService-Info.plist file and replace current one.

For Android
Sign in your Google account, then open Firebase console https://console.firebase.google.com
Create a new project. Then follow documentations. As a result you need to download google-services.json file and replace current one.

## Installation

Clone or unzip the repository.
In root direcory:

npm install

Build iOS app.

In the ios direcory:

pod install

Open eMia.xcworkspace

build the project

Note. For the current react-native version 0.51.0 you will see error like

#import <fishhook/fishhook.h>  file not found

fix it:

#import "fishhook.h"

repead the build.


03-21-2018

Sergey Krotkih
