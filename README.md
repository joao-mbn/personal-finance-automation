Just exploring Google Sheets API to automate a personal finance sheet.

Useful stuff that I know I will forget if I don't write it down:

- Solve dependencies in dart to ensure null safety
    dart pub upgrade --null-safety

- Running dev environment

    - Cloud Function
        - on 'functions' folder run
            firebase emulators:start --inspect-functions
        - save this configuration on "launch.json", inside ".vscode" folder and run it.
            "version": "0.2.0",
            "configurations": [
                {
                    "type": "node",
                    "request": "attach",
                    "name": "debug",
                    "port": 9229
                }
            ]
            - 9229 is the standard port for the emulator.

    - Flutter
        - Select device on bottom right (configurable in Android Studio)
        - run 'flutter run'
        - make sure to add this in the main function
            - FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
            - where 5001 is the cloud function port

- Deploy function
    firebase deploy --only functions:addToSheet

- Build apk to Distribute app
    flutter build apk
