A simple app with which I can update a personal finance google sheets on my Google Drive from my Android phone.

Useful stuff that I know I will forget if I don't write it down:

- Solve dependencies in dart to ensure null safety
    dart pub upgrade --null-safety

- Running dev environment

    - Cloud Function
        - on 'functions' folder run
            firebase emulators:start --inspect-functions
        - save this configuration on "launch.json", inside ".vscode" folder and run it.
            '''
            "version": "0.2.0",
            "configurations": [
                {
                    "type": "node",
                    "request": "attach",
                    "name": "debug",
                    "port": 9229
                }
            ]
            '''
            - 9229 is the standard port for the emulator.
            - For some unknown reason, the App doesn't find the cloud function when it is emulated using node 17.9.0 but it does in node 12.22.1.

    - Flutter
        - Select device on bottom right (configurable in Android Studio)
        - run 'flutter run'
        - make sure to add this in the main function
            - FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
            - where 5001 is the cloud function port

- Deploy function
    firebase deploy --only functions:addToSheet

- Build apk to Distribute app
    - run 'flutter build apk'
    - get the apk file on the place suggested on cmd and paste it on Firebase app distribution

- According to OAuth docs, the refreshing token might get expired.
    - In that case, deleting the token.json file and generating a run new one is necessary. To do so run 'index.py' file.
    - [Reference](https://developers.google.com/identity/protocols/oauth2#expiration)


- To test
    - env.local to .env
    - se o path do env está ok
    - se o link da planilha deve ser feito público primeiro