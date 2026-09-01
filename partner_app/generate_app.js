const fs = require('fs');

const args = process.argv.slice(2);
let kitchenId = 'default';
let appName = 'Kitchen Manager';
let themeColor = 'E5484D';

args.forEach(arg => {
    if (arg.startsWith('--id=')) kitchenId = arg.split('=')[1].replace(/["']/g, '');
    if (arg.startsWith('--name=')) appName = arg.split('=')[1].replace(/["']/g, '');
    if (arg.startsWith('--color=')) themeColor = arg.split('=')[1].replace(/["'#]/g, '');
});

console.log(`⚙️ Customizing Kitchen App for: ${appName}`);

const configDir = './lib';
if (!fs.existsSync(configDir)) fs.mkdirSync(configDir);

const configContent = `import 'package:flutter/material.dart';

class AppConfig {
  static const String appName = "${appName}";
  static const String kitchenId = "${kitchenId}";
  static const String startUrl = "https://rasoisaathi.onrender.com/login.html?kitchen=${kitchenId}";
  static const Color primaryColor = Color(0xFF${themeColor});
}
`;
fs.writeFileSync(`${configDir}/config.dart`, configContent);

const manifestPath = './android/app/src/main/AndroidManifest.xml';
if (fs.existsSync(manifestPath)) {
    let manifest = fs.readFileSync(manifestPath, 'utf8');

    // App ka naam update karein
    manifest = manifest.replace(/android:label="[^"]*"/, `android:label="${appName}"`);

    // GPS permissions inject karein (agar pehle se nahi hain)
    if (!manifest.includes('ACCESS_FINE_LOCATION')) {
        manifest = manifest.replace(
            '<application',
            '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />\n    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />\n    <application'
        );
    }

    fs.writeFileSync(manifestPath, manifest);
}
console.log('🎉 Kitchen App Config Complete!');