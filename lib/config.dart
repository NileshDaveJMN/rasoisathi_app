import 'package:flutter/material.dart';

class AppConfig {
  // Ye values Node.js script automatically replace karegi
  static const String appName = 'Pizza Paradise';
  static const String kitchenId = 'pizza-123';

  // Theme Color
  static const Color primaryColor = Color(0xFFFF6B00);

  // Base URL (Ab seedha customer-app.html load hoga kitchenId ke sath)
  static const String baseUrl = 'https://rasoisaathi.onrender.com/customer-app.html';

  // Final URL jo WebView me load hoga
  static String get startUrl => '$baseUrl?kitchen=$kitchenId';
}