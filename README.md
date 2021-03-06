A simple app with which I can update a personal finance google sheets on my Google Drive from my Android phone.

Useful stuff that I know I will forget if I don't write it down:

- Solve dependencies in dart to ensure null safety
    ~~~Powershell
    dart pub upgrade --null-safety
    ~~~

- Running dev environment

    - Cloud Functions
        - on 'functions' folder run:
            ~~~Powershell
            firebase emulators:start --inspect-functions
            ~~~
            - this will run all emulators on firebase.json (pubsub and functions currently)

        - to debug the functions:
            - save this configuration on "launch.json", inside ".vscode" folder and run it.
                ~~~JSON
                "version": "0.2.0",
                "configurations": [
                    {
                        "type": "node",
                        "request": "attach",
                        "name": "debug",
                        "port": 9229
                    }
                ]
                ~~~
                - 9229 is the standard port for the emulator.
            - For some unknown reason, the App doesn't find the cloud function when it is emulated using node 17.9.0 but it does in
            node 12.22.1 or 16.14.2.

        - to debug pubsub (simulate functions called by time triggers):
            - on a JavaScript Debug Terminal run:
                ~~~Powershell
                firebase functions:shell
                ~~~
                ~~~JavaScript
                setInterval(() => createSheet(), 2000)
                ~~~

    - Flutter
        - Select device on bottom right (configurable in Android Studio)
        run
        ~~~Powershell
        flutter run
        ~~~
        - make sure to add this in the main function
            add
            ~~~Dart
            FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
            ~~~
            - where 5001 is the cloud function port

- Deploy function
    run
    ~~~Powershell
    firebase deploy --only functions:addToSheet,functions:createSheet
    ~~~

- Build apk to Distribute app
    run
    ~~~Powershell
    flutter build apk
    ~~~
    - get the apk file on the place suggested on cmd and paste it on Firebase app distribution

- According to OAuth docs, the refreshing token might get expired.
    - In that case, deleting the token.json file and generating a run new one is necessary. To do so run 'index.py' file.
    - [Reference](https://developers.google.com/identity/protocols/oauth2#expiration)

- Authentication with JWT can be done getting a new key with:
    - Creating a new key for 'App Engine default service account'.
    - Moving the json to functions folder under the name 'keys.json'