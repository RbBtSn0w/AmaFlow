# Quickstart: Amazon Product Selection Analyzer

**Purpose**: Guide developers on how to load, run, and test the extension locally on Google Chrome and Apple Safari.

---

## 1. Local Development Directory Structure

Your extension build directory (`src/` in the project root) should contain:
- `manifest.json`: Configuration and permissions.
- `background.js`: Background script handling BSR calculations and local storage.
- `content.js`: Script injected into Amazon pages to scrape DOM and inject the UI Overlay.
- `popup.html` & `popup.js`: Dropdown action popup to manage the watchlist.
- `icons/`: Directory for action assets.

---

## 2. Load on Google Chrome (Primary)

1. Open **Google Chrome**.
2. Navigate to `chrome://extensions/`.
3. In the top-right corner, toggle the **Developer mode** switch to **ON**.
4. In the top-left, click **Load unpacked**.
5. Select the `src/` folder located in the root of this project.
6. The extension is now active. Open any Amazon US/UK listing (e.g., `amazon.com/dp/B08N5WRWNW`) to test the injected scorecard.

---

## 3. Convert & Run on Apple Safari (SUSPENDED / NOT AUTO-SYNCED)

> [!NOTE]
> Native Safari App Extension packaging is currently suspended to focus exclusively on Google Chrome features. The instructions below are kept for historical reference only and are not updated automatically.

1. Open **Terminal** on your Mac.
2. Navigate to the project root directory.
3. Run the conversion utility provided by Xcode Command Line Tools:
   ```bash
   xcrun safari-web-extension-converter src/ --project-location ./safari-build
   ```
4. Open the generated Xcode project under `./safari-build/` in Xcode.
5. In Xcode, configure a development team (Signing & Capabilities) and build/run the project.
6. Open **Safari** on your Mac.
7. Go to **Safari -> Settings -> Advanced**, and check **Show features for web developers** (or "Show Develop menu").
8. In the menu bar, go to **Develop** and select **Allow Unsigned Extensions**.
9. Go to **Safari -> Settings -> Extensions** and toggle on **myFastM Product Selection Assistant**.
