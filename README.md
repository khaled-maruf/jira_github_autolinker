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

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension directory
6. The extension is now installed!

## Usage

1. Install the extension following the steps above
2. **Configure your JIRA URL:**
   - Right-click the extension icon in Chrome's toolbar and select "Options"
   - OR go to `chrome://extensions/`, find "GitHub to JIRA Autolinker", and click "Extension options"
   - Enter your JIRA instance URL (e.g., `https://your-company.atlassian.net/browse/`)
   - Click "Save Settings"
3. Navigate to any GitHub page (e.g., `https://github.com/yourorg/yourrepo`)
4. Any JIRA ticket references will automatically become clickable links
5. Click on a link to open the ticket in JIRA in a new tab

## Configuration

**Setting up your JIRA URL:**

1. Click on the extension options (right-click extension icon → Options)
2. Enter your JIRA instance URL
3. The extension will automatically add `/browse/` if needed
4. Click Save

**Example JIRA URLs:**
- `https://your-company.atlassian.net/browse/`
- `https://jira.company.com/browse/`

The URL is stored securely in Chrome's sync storage and will sync across your Chrome browsers when signed in.

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

- `manifest.json` - Extension configuration
- `content.js` - Main script that performs the linking
- `options.html` - Settings page for configuring JIRA URL
- `options.js` - Settings page logic
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
- ✅ Stores your JIRA URL locally using Chrome's sync storage
- ✅ Your JIRA URL syncs across your Chrome browsers (when signed in)
- ✅ All processing happens locally in your browser

## Troubleshooting

**Links aren't appearing:**
1. Make sure the extension is enabled in `chrome://extensions/`
2. Check that you've configured a JIRA URL in the extension options
3. Reload the extension after making any changes
4. Hard refresh the GitHub page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
5. Open DevTools console (F12) and check for any errors

**Need to change your JIRA URL:**
- Open extension options and update the URL, then reload GitHub pages

**Extension options not showing:**
- Go to `chrome://extensions/`, find the extension, and click "Extension options"

## License

MIT
