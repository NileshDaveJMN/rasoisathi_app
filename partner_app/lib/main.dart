import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(const PartnerApp());
}

class PartnerApp extends StatelessWidget {
  const PartnerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rasoi Saathi Partner',
      theme: ThemeData(
        primaryColor: const Color(0xFFFF6B00),
        scaffoldBackgroundColor: const Color(0xFF121212),
      ),
      home: const PartnerWebView(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class PartnerWebView extends StatefulWidget {
  const PartnerWebView({super.key});

  @override
  State<PartnerWebView> createState() => _PartnerWebViewState();
}

class _PartnerWebViewState extends State<PartnerWebView> {
  late final WebViewController controller;

  @override
  void initState() {
    super.initState();

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF121212))
      ..loadRequest(Uri.parse('https://rasoisaathi.onrender.com/login.html'));
  }

  @override
  Widget build(BuildContext context) {
    // PopScope phone ke Physical Back Button ko control karta hai
    return PopScope(
      canPop: false,
      onPopInvoked: (didPop) async {
        if (didPop) return;

        // Agar webview me history hai, toh web page back hoga
        if (await controller.canGoBack()) {
          controller.goBack();
        } else {
          // Agar history nahi hai, toh app properly close ho jayegi
          SystemNavigator.pop();
        }
      },
      child: Scaffold(
        body: SafeArea(
          // RefreshIndicator se Pull-to-Refresh aata hai
          child: RefreshIndicator(
            color: const Color(0xFFFF6B00),
            backgroundColor: const Color(0xFF1E1E1E),
            onRefresh: () async {
              await controller.reload();
            },
            child: WebViewWidget(controller: controller),
          ),
        ),
      ),
    );
  }
}