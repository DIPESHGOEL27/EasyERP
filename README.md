# EasyERP AutoLogin Chrome Extension

🚀 A powerful Chrome extension that automates login to ERP systems with advanced security features including credential management, session keep-alive, and code obfuscation.

## ✨ Features

- 🔐 **Auto-login** with securely stored credentials
- 💾 **Local credential storage** using Chrome's secure storage API
- ❓ **Security question handling** with automatic answer filling
- 📱 **OTP support** with manual entry prompt
- ⏰ **Session keep-alive** functionality
- 🎨 **Modern popup UI** for easy credential management
- 🛡️ **Code obfuscation** and minification for production builds
- 📦 **Webpack bundling** for optimized file sizes

## 🚀 Quick Start

### For End Users

1. **Download the latest release** from the [Releases](../../releases) page
2. **Extract the ZIP file** to a folder on your computer
3. **Load in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked" and select the extracted folder
4. **Configure credentials** using the extension popup
5. **Visit your ERP site** and watch the magic happen! ✨

### For Developers

Clone this repository and follow the development setup below.

## 🛠️ Development Setup

### 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Google Chrome** browser
- **Git** (optional, for cloning)

### 🔧 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/easyerp-autologin.git
   cd easyerp-autologin
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the extension:**

   ```bash
   # For development (readable code + source maps)
   npm run build:dev

   # For production (obfuscated + minified)
   npm run build
   ```

4. **Load in Chrome:**
   - Open `chrome://extensions/` in Chrome
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### 🔨 Build Commands

| Command             | Description                                | Use Case                    |
| ------------------- | ------------------------------------------ | --------------------------- |
| `npm run build`     | Production build (obfuscated + minified)   | 🚀 **Distribution/Release** |
| `npm run build:dev` | Development build (readable + source maps) | 🧪 **Development/Testing**  |
| `npm run watch`     | Auto-rebuild on file changes               | ⚡ **Active Development**   |
| `npm run clean`     | Clean the dist folder                      | 🧹 **Reset Build**          |
| `npm run zip`       | Create extension ZIP for distribution      | 📦 **Chrome Store**         |

### 📁 Project Structure

```
📦 easyerp-autologin/
├── 📂 src/                    # 🔧 Source files (edit these)
│   ├── 📄 background.js       # Service worker script
│   ├── 📄 content.js          # Auto-login logic
│   ├── 📄 popup.js            # Popup UI functionality
│   ├── 📄 popup.html          # Popup interface
│   └── 📄 manifest.json       # Extension configuration
├── 📂 dist/                   # 🚀 Built files (generated)
│   ├── 📄 background.js       # (obfuscated in production)
│   ├── 📄 content.js          # (obfuscated in production)
│   ├── 📄 popup.js            # (obfuscated in production)
│   ├── 📄 popup.html
│   └── 📄 manifest.json
├── 📄 webpack.config.js       # Build configuration
├── 📄 package.json            # Dependencies & scripts
├── 📄 README.md               # This file
└── 📄 BUILD.md                # Detailed build instructions
```

## 📖 How to Use

### Initial Setup

1. **Install the extension** (see Quick Start above)
2. **Click the extension icon** in your Chrome toolbar
3. **Enter your credentials** in the popup:
   - Login ID
   - Password
   - Security questions:
4. **Click Save** to store credentials securely

### Daily Usage

1. **Navigate** to your ERP login page (`https://erp.iitkgp.ac.in/*`)
2. **Watch the extension work** - it will automatically:
   - Fill in your login ID and password
   - Answer security questions
   - Request OTP entry when needed
   - Submit the login form
3. **Enter OTP** when prompted
4. **Enjoy** seamless login! 🎉

## 🔧 Loading the Extension in Chrome

### Step-by-Step Guide

1. **Build the extension:**

   ```bash
   npm run build
   ```

2. **Open Chrome Extensions page:**

   - Type `chrome://extensions/` in your address bar, OR
   - Go to Chrome menu → More tools → Extensions

3. **Enable Developer Mode:**

   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension:**

   - Click "Load unpacked" button
   - Navigate to and select the `dist` folder in your project directory
   - The extension should now appear in your extensions list

5. **Pin the extension (optional):**
   - Click the puzzle piece icon in Chrome toolbar
   - Find "EasyERP AutoLogin" and click the pin icon

## 🛡️ Security Features

This extension includes multiple layers of security:

### 🔒 Data Protection

- **Local Storage Only:** Credentials stored securely in Chrome's local storage
- **No Network Transmission:** No data sent to external servers
- **Encrypted Storage:** Uses Chrome's built-in encryption

### 🛡️ Code Protection

- **Advanced Obfuscation:** Production code is heavily obfuscated
- **String Encoding:** All strings encoded in base64
- **Control Flow Flattening:** Code execution path scrambled
- **Dead Code Injection:** Fake code paths to confuse analysis
- **Self-Defending:** Detects and prevents tampering attempts
- **Identifier Renaming:** All variables/functions get random hex names

### 🔍 Development vs Production

| Feature              | Development Build | Production Build         |
| -------------------- | ----------------- | ------------------------ |
| **File Size**        | ~5.4 KB           | ~2.26 KB (62% smaller)   |
| **Code Readability** | ✅ Human readable | ❌ Completely obfuscated |
| **Console Logs**     | ✅ Preserved      | ❌ Removed               |
| **Source Maps**      | ✅ Available      | ❌ Disabled              |
| **Debug Protection** | ❌ Disabled       | ✅ Enabled               |

## ⚙️ Build Configuration

Our webpack setup provides enterprise-grade bundling and security:

### 🎯 Features

- **Multi-Entry Bundling:** Separate bundles for background, content, and popup scripts
- **Smart Optimization:** Different configs for development vs production
- **Asset Copying:** Automatic copying of static files (HTML, manifest)
- **Clean Builds:** Output directory cleaned on each build

### 🔧 Webpack Plugins Used

- **TerserPlugin:** Code minification and optimization
- **WebpackObfuscator:** Advanced JavaScript obfuscation
- **CopyPlugin:** Static file copying and processing

### 📊 Build Performance

```
Production Build Results:
├── background.js    47 bytes  (minimized)
├── content.js       1.57 KB   (obfuscated)
├── popup.js         668 bytes (obfuscated)
├── popup.html       929 bytes (copied)
└── manifest.json    647 bytes (copied)
Total: ~2.26 KB
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes in the `src/` directory
4. **Test** with `npm run build:dev`
5. **Build** production version: `npm run build`
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to your branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### 🧪 Testing Your Changes

```bash
# Development workflow
npm run watch          # Auto-rebuild on changes
# Make your changes in src/
# Test in Chrome with development build
npm run build         # Final production test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues:** Report bugs or request features via [GitHub Issues](../../issues)
- **Discussions:** Join conversations in [GitHub Discussions](../../discussions)
- **Email:** Contact the developer directly

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## ⚠️ Disclaimer

This extension is designed for educational and personal use. Users are responsible for complying with their institution's terms of service and security policies.

---

_Developed by Dipesh Goel_
