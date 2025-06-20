# Build Instructions for EasyERP AutoLogin Extension

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build for production (obfuscated):**

   ```bash
   npm run build
   ```

3. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Available Build Commands

- `npm run build` - Production build (minified + obfuscated)
- `npm run build:dev` - Development build (readable code + source maps)
- `npm run watch` - Development build with file watching
- `npm run clean` - Clean the dist folder
- `npm run zip` - Create a zip file of the built extension

## Build Outputs

### Production Build (`npm run build`)

- **Size:** ~2.26 KB total
- **Obfuscation:** Full code obfuscation with string encoding
- **Minification:** Code is minified and optimized
- **Console removal:** All console.log statements removed
- **Security:** Enhanced with self-defending and control flow flattening

### Development Build (`npm run build:dev`)

- **Size:** ~5.4 KB total
- **Readable code:** Original variable names preserved
- **Source maps:** Available for debugging
- **Console logs:** Preserved for development

## Security Features in Production

The production build includes advanced obfuscation:

1. **String Array Encoding:** Strings are encoded in base64
2. **Control Flow Flattening:** Code flow is obfuscated
3. **Dead Code Injection:** Fake code paths are added
4. **Identifier Renaming:** Variables/functions get hexadecimal names
5. **Self Defending:** Code detects if it's being tampered with
6. **Console Output Disabled:** Prevents debugging via console

## File Structure After Build

```
dist/
├── background.js      # Service worker (obfuscated)
├── content.js         # Content script (obfuscated)
├── popup.js          # Popup logic (obfuscated)
├── popup.html        # Popup UI
└── manifest.json     # Extension manifest
```

## Chrome Store Distribution

For Chrome Web Store submission:

1. Run `npm run build`
2. Run `npm run zip` (if available)
3. Upload the generated `extension.zip` or the `dist` folder contents

## Tips

- Always test with `npm run build:dev` first during development
- Use `npm run watch` for continuous development
- Only use `npm run build` for final distribution
- The obfuscated code may look scrambled - this is intentional for security
