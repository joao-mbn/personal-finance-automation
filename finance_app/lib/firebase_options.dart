// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for ios - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyCGtardnuRN2vfesKQbt8K-10KJdlDW_Rc',
    appId: '1:355493469536:web:80b60c4c117c20df395205',
    messagingSenderId: '355493469536',
    projectId: 'personalfinanceapp-e3bca',
    authDomain: 'personalfinanceapp-e3bca.firebaseapp.com',
    storageBucket: 'personalfinanceapp-e3bca.appspot.com',
    measurementId: 'G-HKQG05ZSN5',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCeE-xYc1NmLZyehUZWU6eSezmg3kM7SZI',
    appId: '1:355493469536:android:026860c4e9acab92395205',
    messagingSenderId: '355493469536',
    projectId: 'personalfinanceapp-e3bca',
    storageBucket: 'personalfinanceapp-e3bca.appspot.com',
  );
}
