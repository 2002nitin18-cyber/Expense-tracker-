# Expense Tracker — Personal Finance & Savings PWA

A clean, automatic monthly income, daily expense, and net savings tracker built as an installable **Progressive Web App (PWA)** for **Android**, **iOS (iPhone/iPad)**, and **Desktop**.

## Folder Structure (Upload All Files to GitHub)

```text
expense-tracker-pwa/
├── index.html                  # Main application UI + Android/iOS PWA tags
├── styles.css                  # Custom styling & iOS safe-area support
├── app.js                      # Auto-calculation engine, charts, localStorage & PWA installer
├── manifest.json               # Web App Manifest for Android "Install App"
├── sw.js                       # Offline Service Worker
├── icons/
│   ├── icon-192.png            # Android home screen icon (192x192)
│   ├── icon-512.png            # Android splash & Play/PWA icon (512x512)
│   ├── apple-touch-icon.png    # iOS iPhone/iPad home screen icon (180x180)
│   └── icon.svg                # Scalable vector app icon
└── README.md                   # Deployment & installation guide
```

## How to Host Free on GitHub Pages (Step-by-Step)

1. Log in to [GitHub](https://github.com) and click **New repository**.
2. Name your repository `expense-tracker`, select **Public**, and click **Create repository**.
3. Click **uploading an existing file** (or **Add file → Upload files**).
4. Extract `expense-tracker-pwa.zip` and drag-and-drop **all files and the `icons/` folder** (`index.html`, `styles.css`, `app.js`, `manifest.json`, `sw.js`, `icons/`, `README.md`) into GitHub.
5. Click **Commit changes**.
6. Go to your repository **Settings → Pages** (on the left sidebar).
7. Under **Build and deployment → Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
8. Wait ~60 seconds. Your live app URL will be:
   `https://<your-github-username>.github.io/expense-tracker/`

## How to Install on Android

1. Open your GitHub Pages URL in **Google Chrome** on your Android phone.
2. Tap the **Install App** button in the top header of the app, **OR** tap Chrome's **three-dot menu (⋮)** in the top-right corner and select **Install app** / **Add to Home screen**.
3. Confirm by tapping **Install**. The app icon will appear in your Android app drawer and launch full-screen like a native app (even offline).

## How to Add to Home Screen on iOS (iPhone / iPad)

1. Open your GitHub Pages URL in **Safari** on your iPhone or iPad.
2. Tap the **Share** icon (`↑` square with arrow) at the bottom of Safari.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add** in the top-right corner. Expense Tracker will appear on your iOS Home Screen with its custom icon and open in full-screen standalone mode.
