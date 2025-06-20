# 🔐 EasyERP AutoLogin Chrome Extension

A secure Chrome extension that automates login to ERP systems with advanced security features.

## ✨ Features

- 🔐 **Secure auto-login** with encrypted credential storage
- ❓ **Smart security question handling**
- 📱 **OTP integration** support
- 🎨 **Modern popup interface** for credential management
- 🛡️ **Advanced code protection** with obfuscation
- ⚡ **Optimized performance** with webpack bundling

## 🚀 Installation

### For Users

1. **Download the latest release** from [Releases](../../releases)
2. **Extract the ZIP file** to a folder
3. **Load in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extracted folder

### For Developers

1. **Clone and setup:**

   ```bash
   git clone https://github.com/DIPESHGOEL27/EasyERP.git
   cd EasyERP
   npm install
   ```

2. **Build the extension:**

   ```bash
   npm run build
   ```

3. **Load the `dist` folder** in Chrome extensions

## 🛠️ Available Commands

- `npm run build` - Production build (obfuscated & optimized)
- `npm run dev` - Development build
- `npm run watch` - Development with auto-rebuild

## 🔒 Security Features

This extension implements multiple layers of security:

- **Local encryption** of stored credentials
- **Code obfuscation** to prevent reverse engineering
- **No data transmission** - everything stays local
- **Secure Chrome storage API** integration
- **Advanced anti-tampering** protection

## 📋 Requirements

- **Chrome browser** (or Chromium-based browsers)
- **ERP access** for the target system
- **Node.js 16+** (for building from source)

## 🎯 Usage

1. **Install the extension** following the steps above
2. **Click the extension icon** in Chrome toolbar
3. **Enter your credentials** in the popup interface
4. **Visit your ERP site** - login will be automated!

## 🔧 Build Information

- **Webpack 5** for bundling and optimization
- **JavaScript obfuscation** for code protection
- **Terser minification** for size optimization
- **Cross-platform compatibility**

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Dipesh Goel**

- GitHub: [@DIPESHGOEL27](https://github.com/DIPESHGOEL27)
- Email: dipeshgoel@kgpian.iitkgp.ac.in

## ⚠️ Disclaimer

This extension is for educational and personal use. Users are responsible for complying with their organization's security policies.

---

_🔒 Code is protected with advanced obfuscation techniques to ensure security and prevent unauthorized modifications._
