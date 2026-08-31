const fs = require('fs');

// Command line se Kitchen ID aur App Name pakadna
const args = process.argv.slice(2);
let kitchenId = 'default';
let appName = 'Cloud Kitchen';

args.forEach(arg => {
    if (arg.startsWith('--id=')) kitchenId = arg.split('=')[1].replace(/"/g, '');
    if (arg.startsWith('--name=')) appName = arg.split('=')[1].replace(/"/g, '');
});

console.log(`⚙️ Customizing Flutter App for: ${appName} (ID: ${kitchenId})`);

// 1. Flutter App ke liye config.dart banana (Jise main.dart dhoondh rahi hai)
const configDir = './lib';
if (!fs.existsSync(configDir)) fs.mkdirSync(configDir);

const configContent = `import 'package:flutter/material.dart';

class AppConfig {
  static const String appName = "${appName}";
  static const String kitchenId = "${kitchenId}";

  // Aapka Live WebView URL jo specific kitchen ID ke sath khulega
  static const String startUrl = "https://rasoisaathi.onrender.com/customer-app.html?kitchen=${kitchenId}";

  static const Color primaryColor = Color(0xFFE5484D);
}
`;
fs.writeFileSync(`${configDir}/config.dart`, configContent);
console.log('✅ Updated lib/config.dart successfully with live Render URL');

// 2. Android App ka Asli Naam (Launcher Name) Change Karna
const manifestPath = './android/app/src/main/AndroidManifest.xml';
if (fs.existsSync(manifestPath)) {
    let manifest = fs.readFileSync(manifestPath, 'utf8');
    // Android label ko replace karna
    manifest = manifest.replace(/android:label="[^"]*"/, `android:label="${appName}"`);
    fs.writeFileSync(manifestPath, manifest);
    console.log(`✅ Changed Android App Name to: ${appName}`);
} else {
    console.log('⚠️ AndroidManifest.xml not found, skipping name change.');
}

console.log('🎉 App Customization Complete! Ready for APK Build.');