# GitHub to JIRA Autolinker

A Chrome extension that automatically converts JIRA ticket references (e.g., `PROJ-123`) into clickable links on GitHub pages.

## Table of Contents

- [What It Does](#what-it-does)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [JIRA Ticket Pattern](#jira-ticket-pattern)
- [Files](#files)
- [How It Works](#how-it-works)
- [Privacy](#privacy)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## What It Does

When browsing GitHub (pull requests, issues, comments, etc.), this extension automatically detects JIRA ticket references in the text and converts them into clickable links that open directly in your JIRA instance.

**Example:**
- Text: "Fixed bug in PROJ-123"
- Result: "Fixed bug in [PROJ-123](https://optimizely-ext.atlassian.net/browse/PROJ-123)" (clickable link)

## Features

- 🔍 Automatically detects JIRA ticket patterns (e.g., `PROJ-123`, `FRONT-404`)
- 🔗 Converts them to clickable links
- 🎯 Works on all GitHub pages (PRs, issues, comments, READMEs)
- ⚡ Real-time linking as content loads (handles GitHub's dynamic page updates)
- 🎨 Styled links in JIRA blue (#0052cc)
- 🚫 Smart enough to skip linking inside code blocks, links, and input fields

## Installation

### Chrome

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `chrome` directory from this repository
6. The extension is now installed!

### Firefox

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to the `firefox` directory and select the `manifest.json` file
5. The extension is now installed!

**Note:** For Firefox, temporary add-ons are removed when you close the browser. For permanent installation, you would need to sign the extension through Mozilla Add-ons.

## Usage

### Quick Setup (Easiest!)

1. Install the extension following the steps above
2. **Click the extension icon** in your browser toolbar
3. Enter your JIRA URL (e.g., `https://your-company.atlassian.net/browse/`)
4. Click "Save"
5. Visit any GitHub page - JIRA ticket references will now be clickable links!

### Alternative: Using Options Page

- **Chrome:** Right-click the extension icon → "Options", OR go to `chrome://extensions/` → "Extension options"
- **Firefox:** Right-click the extension icon → "Manage Extension" → "Options", OR go to `about:addons` → "Options"

## Configuration

**Quick configuration:**

Simply click the extension icon in your browser toolbar and enter your JIRA URL. The popup will:
- Auto-format your URL (adds `/browse/` if needed)
- Validate the URL
- Save instantly
- Auto-close after saving

**Example JIRA URLs:**
- `https://your-company.atlassian.net/browse/`
- `https://jira.company.com/browse/`

The URL is stored securely in browser sync storage and will sync across your browsers when signed in.

## JIRA Ticket Pattern

The extension recognizes JIRA tickets matching this pattern:
- Starts with 2+ uppercase letters (can include numbers)
- Followed by a hyphen (-)
- Followed by one or more digits

**Valid examples:**
- `PROJ-123`
- `ABC-1`
- `FRONT-404`
- `API2-999`

**Invalid examples:**
- `proj-123` (lowercase)
- `P-123` (only one letter)
- `PROJ123` (no hyphen)

## Files

### Chrome Version (`chrome/`)

- `manifest.json` - Extension configuration (Manifest V3)
- `content.js` - Main script that performs the linking
- `popup.html` - Quick setup popup (click extension icon)
- `popup.js` - Popup logic
- `options.html` - Full settings page
- `options.js` - Settings page logic

### Firefox Version (`firefox/`)

- `manifest.json` - Extension configuration (Manifest V2)
- `content.js` - Main script that performs the linking (Firefox-compatible)
- `popup.html` - Quick setup popup (click extension icon)
- `popup.js` - Popup logic (Firefox-compatible)
- `options.html` - Full settings page
- `options.js` - Settings page logic (Firefox-compatible)

### Root
- `README.md` - This file

## How It Works

1. The content script (`content.js`) loads on all GitHub pages
2. It scans the page for text matching the JIRA ticket pattern
3. When found, it wraps the text in an anchor tag linking to your JIRA instance
4. A MutationObserver monitors for new content (GitHub uses dynamic page loading)
5. New content is automatically processed as it appears

## Privacy

This extension:
- ✅ Only runs on GitHub.com
- ✅ Does not collect or transmit any data
- ✅ Stores your JIRA URL locally using browser sync storage
- ✅ Your JIRA URL syncs across your browsers (when signed in)
- ✅ All processing happens locally in your browser
- ✅ Works identically in Chrome and Firefox

## Troubleshooting

**Links aren't appearing:**
1. Make sure the extension is enabled in your browser's extension manager
2. Check that you've configured a JIRA URL in the extension options
3. Reload the extension after making any changes
4. Hard refresh the GitHub page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
5. Open DevTools console (F12) and check for any errors

**Need to change your JIRA URL:**
- Open extension options and update the URL, then reload GitHub pages

**Extension options not showing:**
- **Chrome:** Go to `chrome://extensions/`, find the extension, and click "Extension options"
- **Firefox:** Go to `about:addons`, find the extension, and click "Options"

**Firefox: Extension disappears after browser restart:**
- Temporary add-ons in Firefox are removed when the browser closes. For permanent installation, the extension needs to be signed through Mozilla Add-ons or you need to use Firefox Developer Edition/Nightly with `xpinstall.signatures.required` set to `false` in `about:config`.

## License

MIT
