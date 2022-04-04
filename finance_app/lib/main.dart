import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:cloud_functions/cloud_functions.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: const Text('Entry/Exits to FP-Sheet'),
          ),
          body: const EEForm()),
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
    );
  }
}

class EEForm extends StatefulWidget {
  const EEForm({Key? key}) : super(key: key);

  @override
  EEFormState createState() {
    return EEFormState();
  }
}

class EEFormState extends State<EEForm> {
  final _formKey = GlobalKey<FormState>();

  final operationPlaceController = TextEditingController();
  final operationTypeController = TextEditingController();
  final descriptionController = TextEditingController();
  final quantityController = TextEditingController();

  @override
  void dispose() {
    operationPlaceController.dispose();
    operationTypeController.dispose();
    descriptionController.dispose();
    quantityController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DropdownButtonFormField(
            items: createDropdownMenu(['Ações', 'CDB', 'Inter', 'BB']),
            onChanged: (value) {
              operationPlaceController.text = value.toString();
            },
            validator: (value) {
              return mandatory(value);
            },
          ),
          DropdownButtonFormField(
            items: createDropdownMenu([
              ' ',
              'Contas',
              'Gastos Pessoais',
              'Salário',
              'Transferência',
              'Dívidas',
              'Dividendos',
              'JSCP'
            ]),
            onChanged: (value) {
              operationTypeController.text = value.toString();
            },
          ),
          TextFormField(
            decoration: const InputDecoration(
              labelText: 'Descrição',
              hintText: 'Pasta de Amendoim',
            ),
            controller: descriptionController,
          ),
          TextFormField(
            decoration: const InputDecoration(
              labelText: 'Valor R\$',
              helperText:
                  'Se for negativo é uma despesa, se for positivo é um recebimento',
              hintText: '-155,00',
            ),
            controller: quantityController,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            validator: (value) {
              return mandatory(value);
            },
          ),
          ElevatedButton(
            child: const Text('Submit'),
            onPressed: () async {
              if (_formKey.currentState!.validate()) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Processing Data')),
                );
                Map<String, String> dataToSend = {
                  'place': operationPlaceController.text,
                  'type': operationTypeController.text,
                  'description': descriptionController.text,
                  'quantity': quantityController.text,
                };
                String response = await sendToSheet(dataToSend);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(response),
                    backgroundColor:
                        response == 'Success!' ? Colors.green : Colors.red,
                  ),
                );
              }
            },
          ),
        ],
      ),
    );
  }
}

mandatory(value) {
  if (value == null || value.isEmpty) {
    return 'Este campo é obrigatório';
  }
  return null;
}

List<DropdownMenuItem<Object>>? createDropdownMenu(List<String> options) {
  return options
      .map((value) => DropdownMenuItem(
            value: value,
            child: Text(value),
          ))
      .toList();
}

Future<String> sendToSheet(Map<String, String> dataToSend) async {
  HttpsCallable callable =
      FirebaseFunctions.instance.httpsCallable('addToSheet');

  final resp = await callable.call({
    'text': dataToSend,
  });

  return resp.data as String;
}
