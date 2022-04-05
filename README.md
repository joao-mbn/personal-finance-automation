Just exploring Google Sheets API to automate a personal finance sheet.

Useful stuff that I know I will forget if I don't write it down:

- Solve dependencies in dart to ensure null safety
    dart pub upgrade --null-safety

- Running dev environment
    - Cloud Function
        - On a JS debug terminal run:
            - run 'npm run serve'

    - Flutter
        - Select device on bottom right (configurable in Android Studio)
        - run 'flutter run'
        - make sure to add this in the main function
            - FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
            - where 5001 is the cloud function port

- Deploy function
    firebase deploy --only functions:addToSheet

