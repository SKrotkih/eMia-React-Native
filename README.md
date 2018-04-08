# eMia

This is the entire source code of the cross-platform (iOS and Android) app. 
It's been developing with using [React Native](https://facebook.github.io/react-native/docs/getting-started.html) and [Firebase](https://firebase.google.com/docs/).

## Introduction

There are two native apps. They are: [eMia-iOS](https://github.com/SKrotkih/eMia-iOS) and [eMia-Android](https://github.com/SKrotkih/eMia-Android). Here you can see the React Native code example which summarizes them.
The project is in process.

eMia is an application like a forum. 
You can be registered as an user database on the Firebase. 
You can edit your profile, post new topic with a title, description and a photo.
The App will sends you push-notification if another user likes your post.

eMia uses Firebase database, storage, authentication and cloud messages.

## Requirements

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
Then, in the root direcory:

npm install

Follow the next steps for building iOS app.

In the ios directory:

pod install

Open eMia.xcworkspace

Build the project

Go to the project's root directory. Start server in console:

npm start

Run the iOS app.

Last edited on 04-07-2018

Sergey Krotkih
